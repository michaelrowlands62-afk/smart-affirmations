import { useState } from "react";
import { voices, DEFAULT_VOICE_ID } from "../data/voices";

const STORAGE_KEY = "sa_voice_id";

// Remembers which ElevenLabs voice the user picked so it carries across pages
// (Home, Explore, Generate) instead of resetting every time "listen" appears.
export function useVoicePreference() {
  const [voiceId, setVoiceId] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && voices.some((v) => v.id === stored) ? stored : DEFAULT_VOICE_ID;
  });

  function selectVoice(id) {
    setVoiceId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  return { voiceId, selectVoice };
}
