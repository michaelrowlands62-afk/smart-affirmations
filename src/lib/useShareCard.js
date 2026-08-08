import { useCallback, useState } from "react";
import { downloadAffirmationCard } from "./shareCard";

const DONE_DISPLAY_MS = 1800;

// Tracks per-card share status ("loading" | "done" | "error") so a page with
// multiple share buttons (e.g. Explore) can drive each one independently,
// mirroring the id-keyed pattern used by useSpeech.
export function useShareCard() {
  const [statuses, setStatuses] = useState({});

  const shareCard = useCallback(async (id, cardOptions) => {
    setStatuses((s) => ({ ...s, [id]: "loading" }));
    try {
      await downloadAffirmationCard(cardOptions);
      setStatuses((s) => ({ ...s, [id]: "done" }));
    } catch (err) {
      console.error("share card failed", err);
      setStatuses((s) => ({ ...s, [id]: "error" }));
    } finally {
      setTimeout(() => {
        setStatuses((s) => {
          const { [id]: _discard, ...rest } = s;
          return rest;
        });
      }, DONE_DISPLAY_MS);
    }
  }, []);

  const getShareStatus = useCallback((id) => statuses[id] ?? "idle", [statuses]);

  return { shareCard, getShareStatus };
}
