import { describe, expect, it } from 'vitest';
import type { Kid } from '@/types/domain';
import { suggestKid } from './whose-turn';

function kid(id: string, lastPlayed: number | null): Kid {
  return { id, name: id, age: null, color: '#e0795a', lastPlayed };
}

describe('suggestKid', () => {
  it('returns null when there are no children', () => {
    expect(suggestKid([])).toBeNull();
  });

  it('returns the only child when there is one', () => {
    const only = kid('a', 1000);
    expect(suggestKid([only])).toBe(only);
  });

  it('picks the child played with least recently', () => {
    const recent = kid('recent', 5000);
    const overdue = kid('overdue', 1000);
    expect(suggestKid([recent, overdue])?.id).toBe('overdue');
  });

  it('treats a never-played child (null) as the most overdue', () => {
    const played = kid('played', 1000);
    const neverPlayed = kid('new', null);
    expect(suggestKid([played, neverPlayed])?.id).toBe('new');
  });
});
