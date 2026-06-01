import type { Kid } from '@/types/domain';

/*
 * Whose-turn logic: suggest the child you have had Special Time with least
 * recently. A child who has never played (lastPlayed null) is the most overdue.
 * Surfaced as a warm invitation, never as a guilt-trip. Pure and testable.
 */
export function suggestKid(kids: Kid[]): Kid | null {
  if (kids.length === 0) {
    return null;
  }
  // Treat null as 0 so the never-played child sorts first (most overdue).
  return kids.slice().sort((a, b) => (a.lastPlayed ?? 0) - (b.lastPlayed ?? 0))[0];
}
