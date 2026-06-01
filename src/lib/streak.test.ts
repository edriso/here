import { describe, expect, it } from 'vitest';
import { nextStreak } from './streak';

const NOW = new Date(2026, 2, 10, 12, 0, 0);

describe('nextStreak', () => {
  it('starts at 1 the first time', () => {
    expect(nextStreak({ streak: 0, lastDay: null }, NOW)).toBe(1);
  });

  it('does not change when already counted today', () => {
    expect(nextStreak({ streak: 3, lastDay: '2026-03-10' }, NOW)).toBe(3);
  });

  it('goes up by one on a new day', () => {
    expect(nextStreak({ streak: 3, lastDay: '2026-03-09' }, NOW)).toBe(4);
  });

  it('does not punish a gap (it is a gentle count, not a pressure streak)', () => {
    // A long gap still just increments; the app never shames a missed day.
    expect(nextStreak({ streak: 3, lastDay: '2026-01-01' }, NOW)).toBe(4);
  });
});
