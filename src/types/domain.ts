import { z } from 'zod';

export const PRIDE_KEYS = ['P', 'R', 'I', 'D', 'E'] as const;
export const prideKeySchema = z.enum(PRIDE_KEYS);
export type PrideKey = z.infer<typeof prideKeySchema>;

export const themeSchema = z.enum(['warm', 'dark']);
export type Theme = z.infer<typeof themeSchema>;

export const minutesSchema = z.union([z.literal(5), z.literal(10), z.literal(15)]);
export type Minutes = z.infer<typeof minutesSchema>;

/** A child. `lastPlayed` is the epoch ms of the last Special Time, or null. */
export const kidSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().int().nullable(),
  color: z.string(),
  lastPlayed: z.number().nullable(),
});
export type Kid = z.infer<typeof kidSchema>;

/** A completed Special Time session. `moment` is the optional keepsake note. */
export const sessionSchema = z.object({
  id: z.string(),
  kidId: z.string(),
  at: z.number(),
  minutes: z.number().int(),
  skill: prideKeySchema,
  moment: z.string(),
});
export type Session = z.infer<typeof sessionSchema>;

/** Look and session preferences. */
export const settingsSchema = z.object({
  theme: themeSchema,
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  minutes: minutesSchema,
  chime: z.boolean(),
  rotateSkill: z.boolean(),
});
export type Settings = z.infer<typeof settingsSchema>;

/** The app's data: children, sessions, and the low-key internal counters. */
export const appDataSchema = z.object({
  kids: z.array(kidSchema),
  sessions: z.array(sessionSchema),
  // A gentle, never-surfaced count of days the parent showed up.
  streak: z.number().int().nonnegative(),
  lastDay: z.string().nullable(),
  // Which PRIDE skill to surface next (rotates one per completed session).
  prideIdx: z.number().int().nonnegative(),
});
export type AppData = z.infer<typeof appDataSchema>;

/** Everything we persist, wrapped with a version for safe future migrations. */
export const persistedStateSchema = z.object({
  version: z.literal(1),
  settings: settingsSchema,
  data: appDataSchema,
});
export type PersistedState = z.infer<typeof persistedStateSchema>;

/** The fields captured when a session completes (before an id is assigned). */
export type SessionDraft = Omit<Session, 'id'>;
