export function formatDate(dateAsNumber: number) {
  if (dateAsNumber < 0) return `${Math.abs(dateAsNumber)} BC`;
  return `${dateAsNumber} AD`;
}
