export function formatDate(dateAsNumber: number) {
  if (dateAsNumber < 0) return `${Math.abs(dateAsNumber)} BC`;
  return `${dateAsNumber} AD`;
}

export function formatDateRange(startDate: number, endDate: number) {
  let range = formatDate(startDate);
  if (startDate !== endDate) {
    range += ` to ${formatDate(endDate)}`;
  }
  return range;
}
