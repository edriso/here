import type { AppData } from '@/types/domain';
import { todayKey } from './date';

/*
 * A gentle, low-key day count. It is intentionally NOT a pressure streak: it is
 * never surfaced as something to protect, and it does not shame a missed day.
 * It simply goes up by one the first time the parent shows up on a new day.
 */
export function nextStreak(
  data: Pick<AppData, 'streak' | 'lastDay'>,
  now: Date = new Date(),
): number {
  if (data.lastDay === todayKey(now)) {
    return data.streak || 1;
  }
  return (data.streak || 0) + 1;
}
