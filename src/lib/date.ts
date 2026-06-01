/** Pure date helpers. A "day key" is the local calendar day as "YYYY-MM-DD". */

const ONE_DAY = 864e5;

export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** A long, friendly date like "Monday, June 1". */
export function formatLongDate(date: Date = new Date()): string {
  return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

/** A full date like "June 1, 2026", used on keepsake moments. */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * A gentle relative phrase for the last Special Time. Framed as an invitation,
 * never a guilt-trip. Pure: pass `now` for stable results in tests.
 */
export function daysAgo(timestamp: number | null, now: number = Date.now()): string {
  if (!timestamp) {
    return 'not yet';
  }
  const days = Math.floor((now - timestamp) / ONE_DAY);
  if (days <= 0) {
    return 'today';
  }
  if (days === 1) {
    return 'yesterday';
  }
  return `${days} days ago`;
}
