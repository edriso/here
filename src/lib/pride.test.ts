import { describe, expect, it } from 'vitest';
import { pride } from './content';
import { nextPrideIndex, skillFor } from './pride';

describe('nextPrideIndex', () => {
  it('advances by one and wraps around P -> R -> I -> D -> E -> P', () => {
    expect(nextPrideIndex(0, 5)).toBe(1);
    expect(nextPrideIndex(3, 5)).toBe(4);
    expect(nextPrideIndex(4, 5)).toBe(0);
  });
});

describe('skillFor', () => {
  it('rotates through the skills when rotation is on', () => {
    expect(skillFor(0, true, pride).key).toBe('P');
    expect(skillFor(1, true, pride).key).toBe('R');
    expect(skillFor(4, true, pride).key).toBe('E');
    expect(skillFor(5, true, pride).key).toBe('P');
  });

  it('always shows Describe when rotation is off', () => {
    expect(skillFor(0, false, pride).key).toBe('D');
    expect(skillFor(2, false, pride).key).toBe('D');
  });
});
