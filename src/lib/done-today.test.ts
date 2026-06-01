import { describe, expect, it } from 'vitest';
import type { Session } from '@/types/domain';
import { doneTodayKidIds, isDoneToday } from './done-today';

// Fixed local "now": 10 March 2026, 9am.
const NOW = new Date(2026, 2, 10, 9, 0, 0);

function session(kidId: string, at: Date): Session {
  return { id: `s-${kidId}`, kidId, at: at.getTime(), minutes: 5, skill: 'D', moment: '' };
}

describe('done-today', () => {
  it('matches sessions by calendar day, including late at night', () => {
    const earlyToday = session('a', new Date(2026, 2, 10, 0, 30, 0));
    const lateToday = session('b', new Date(2026, 2, 10, 23, 45, 0));
    const yesterday = session('c', new Date(2026, 2, 9, 23, 45, 0));

    const ids = doneTodayKidIds([earlyToday, lateToday, yesterday], NOW);
    expect(ids.has('a')).toBe(true);
    expect(ids.has('b')).toBe(true);
    expect(ids.has('c')).toBe(false);
  });

  it('isDoneToday answers for a single child', () => {
    const sessions = [session('a', new Date(2026, 2, 10, 8, 0, 0))];
    expect(isDoneToday('a', sessions, NOW)).toBe(true);
    expect(isDoneToday('b', sessions, NOW)).toBe(false);
  });
});
