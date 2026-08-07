import { useEffect, useState } from "react";

// Shared text-to-speech toggle for affirmation cards, backed by the browser's
// built-in SpeechSynthesis API. `id` lets a page with multiple cards (e.g.
// Explore) track which one is currently speaking; pages with a single card
// can just pass a constant string.
export function useSpeech() {
  const [speakingId, setSpeakingId] = useState(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function toggleSpeak(id, text) {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeakingId((current) => (current === id ? null : current));
    utterance.onerror = () => setSpeakingId((current) => (current === id ? null : current));

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  }

  return { speakingId, toggleSpeak };
}
