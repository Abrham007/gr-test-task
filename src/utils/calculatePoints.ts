function seasonStart(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  // Meteorological seasons: Mar 1, Jun 1, Sep 1, Dec 1
  if (m >= 3 && m <= 5) return new Date(y, 2, 1); // Spring
  if (m >= 6 && m <= 8) return new Date(y, 5, 1); // Summer
  if (m >= 9 && m <= 11) return new Date(y, 8, 1); // Autumn
  return new Date(y, 11, 1); // Winter (Dec 1)
}

export function calculateDailyPoints(date = new Date()): number {
  const start = seasonStart(date);
  const dayIndex =
    Math.floor(
      (date.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) /
        (24 * 60 * 60 * 1000)
    ) + 1;
  if (dayIndex <= 1) return 2;
  if (dayIndex === 2) return 3;
  let p1 = 2; // day 1
  let p2 = 3; // day 2
  for (let i = 3; i <= dayIndex; i++) {
    const next = Math.round(p1 + 0.6 * p2);
    p1 = p2;
    p2 = next;
  }
  return p2;
}
