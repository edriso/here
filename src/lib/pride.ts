import type { PrideSkill } from './content';

/*
 * PRIDE rotation: surface one skill at a time so the parent practises a single
 * thing per session. Completing a session advances to the next (P -> R -> I ->
 * D -> E -> P). When rotation is off, we always show Describe, the gentlest,
 * most forgiving skill to start with. Pure and testable.
 */

const DESCRIBE_INDEX = 3;

/** The next prideIdx after a completed session (wraps around). */
export function nextPrideIndex(prideIdx: number, total: number): number {
  return (prideIdx + 1) % total;
}

/** The skill to surface, given the rotation index and whether rotation is on. */
export function skillFor(prideIdx: number, rotateSkill: boolean, skills: PrideSkill[]): PrideSkill {
  if (!rotateSkill) {
    return skills[DESCRIBE_INDEX];
  }
  return skills[((prideIdx % skills.length) + skills.length) % skills.length];
}
