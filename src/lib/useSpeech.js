import { useEffect, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { getDeviceId } from "./deviceId";

// Shared text-to-speech toggle for affirmation cards. Tries ElevenLabs (via the
// text-to-speech edge function) first for a chosen voice, and always falls back
// to the browser's built-in SpeechSynthesis API if ElevenLabs errors, the daily
// cap is hit, or Supabase isn't configured — the user should always hear
// something, and only ever one thing at a time. `id` lets a page with multiple
// cards (e.g. Explore) track which one is currently speaking; pages with a
// single card can just pass a constant string.
export function useSpeech() {
  const [speakingId, setSpeakingId] = useState(null);
  const audioRef = useRef(null);
  // Tracks which id is "currently requested," synchronously and ahead of React
  // state, so both a rapid double-click and an in-flight ElevenLabs fetch can
  // tell whether they're still the active request before doing anything audible.
  const activeIdRef = useRef(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      stopAudio();
    };
  }, []);

  // Detaching the handlers before pause()/src="" matters: clearing .src on an
  // element that had a real source fires its `error` event, which would
  // otherwise be mistaken for a genuine playback failure and re-trigger the
  // browser-voice fallback right as we're trying to stop or switch audio.
  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }

  // Clears the "currently speaking" state, but only if `id` is still the one
  // it applies to — a superseded/stopped request's late callback should not
  // clobber whatever is playing now.
  function finishSpeaking(id) {
    if (activeIdRef.current === id) activeIdRef.current = null;
    setSpeakingId((current) => (current === id ? null : current));
  }

  function speakWithBrowserVoice(id, text) {
    if (!("speechSynthesis" in window)) {
      finishSpeaking(id);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => finishSpeaking(id);
    utterance.onerror = () => finishSpeaking(id);
    window.speechSynthesis.speak(utterance);
  }

  async function speakWithElevenLabs(id, text, voiceId) {
    const { data, error } = await supabase.functions.invoke("text-to-speech", {
      body: { text, voiceId, deviceId: getDeviceId() },
      // Dev-only header so local testing isn't capped by the 5/day limit. This is
      // stripped from production builds (import.meta.env.DEV is false) and the
      // function only honors it when the request also originates from localhost,
      // so it has no effect once the site is deployed.
      headers: import.meta.env.DEV ? { "x-dev-bypass": "1" } : undefined,
    });

    // The user may have hit stop, or switched to another card, while this was
    // in flight — don't start audio for a request that's no longer active.
    if (activeIdRef.current !== id) return;

    // Any failure here (network error, rate limit, misconfigured function) falls
    // straight through to the browser voice rather than surfacing an error.
    if (error || !data?.audioBase64) {
      speakWithBrowserVoice(id, text);
      return;
    }

    const audio = new Audio(`data:${data.mimeType || "audio/mpeg"};base64,${data.audioBase64}`);
    audioRef.current = audio;

    // A single real failure can both reject audio.play() and fire the `error`
    // event — guard so that only ever falls back once, not twice.
    let fallenBack = false;
    const fallBackToBrowser = () => {
      if (fallenBack) return;
      fallenBack = true;
      if (activeIdRef.current === id) speakWithBrowserVoice(id, text);
    };

    audio.onended = () => finishSpeaking(id);
    audio.onerror = () => {
      stopAudio();
      fallBackToBrowser();
    };

    try {
      await audio.play();
    } catch {
      fallBackToBrowser();
    }
  }

  function stopPlayback() {
    activeIdRef.current = null;
    window.speechSynthesis?.cancel();
    stopAudio();
    setSpeakingId(null);
  }

  function startPlayback(id, text, voiceId) {
    // Setting this synchronously (unlike the `speakingId` state, which only
    // commits on the next render) is what makes a rapid double-click on the
    // same button register as stop-then-start rather than two overlapping starts.
    activeIdRef.current = id;
    window.speechSynthesis?.cancel();
    stopAudio();
    setSpeakingId(id);

    if (voiceId && isSupabaseConfigured) {
      speakWithElevenLabs(id, text, voiceId);
    } else {
      speakWithBrowserVoice(id, text);
    }
  }

  function toggleSpeak(id, text, voiceId) {
    if (activeIdRef.current === id) {
      stopPlayback();
    } else {
      startPlayback(id, text, voiceId);
    }
  }

  return { speakingId, toggleSpeak };
}
