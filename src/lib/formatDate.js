export function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`)
    .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    .toLowerCase();
}
