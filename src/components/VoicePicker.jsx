import { voices } from "../data/voices";

export default function VoicePicker({ voiceId, onSelect, disabled }) {
  return (
    <div className="voice-picker" role="group" aria-label="choose a voice">
      <span className="voice-picker-label">voice</span>
      <div className="voice-picker-chips">
        {voices.map((v) => (
          <button
            type="button"
            key={v.id}
            className={`voice-chip${voiceId === v.id ? " active" : ""}`}
            onClick={() => onSelect(v.id)}
            disabled={disabled}
            aria-pressed={voiceId === v.id}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}
