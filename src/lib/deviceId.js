const STORAGE_KEY = "sa_device_id";

// A stable per-browser identifier used only to enforce the generate-affirmation
// daily rate limit — no login required, nothing personally identifying.
export function getDeviceId() {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
