import type { Session } from '@/types/domain';
import { todayKey } from './date';

/*
 * "Done today" derivation, by calendar day (so it is correct across time zones
 * and midnight). Used to show, gently, who has had their five minutes today.
 * Pure: pass `now` for stable results in tests.
 */

export function doneTodayKidIds(sessions: Session[], now: Date = new Date()): Set<string> {
  const today = todayKey(now);
  const ids = new Set<string>();
  for (const session of sessions) {
    if (todayKey(new Date(session.at)) === today) {
      ids.add(session.kidId);
    }
  }
  return ids;
}

export function isDoneToday(kidId: string, sessions: Session[], now: Date = new Date()): boolean {
  return doneTodayKidIds(sessions, now).has(kidId);
}
