import {
  type Kid,
  type PersistedState,
  persistedStateSchema,
  type SessionDraft,
} from '@/types/domain';
import { makeSeedData, pride } from './content';
import { todayKey } from './date';
import { nextPrideIndex } from './pride';
import { nextStreak } from './streak';

/*
 * The persistence seam. Components and the store never touch storage directly,
 * they go through this typed interface. It is backed by localStorage today; a
 * Dexie/IndexedDB version could slot in behind the same interface later.
 *
 * Persisted data is parsed with Zod, so a corrupt or out-of-date shape safely
 * falls back to sensible defaults instead of crashing.
 */

const STORAGE_KEY = 'here-v1';

export function createDefaultState(now: number = Date.now()): PersistedState {
  return {
    version: 1,
    settings: {
      theme: 'warm',
      accent: '#e0795a',
      minutes: 5,
      chime: true,
      rotateSkill: true,
    },
    data: makeSeedData(now),
  };
}

export interface Repository {
  getState(): PersistedState;
  saveState(state: PersistedState): void;
  addKid(kid: Kid): PersistedState;
  removeKid(id: string): PersistedState;
  completeSession(draft: SessionDraft, now: Date): PersistedState;
  deleteMoment(sessionId: string): PersistedState;
  clear(): void;
}

export function createLocalStorageRepository(storage: Storage = localStorage): Repository {
  function getState(): PersistedState {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return createDefaultState();
      }
      const parsed = persistedStateSchema.safeParse(JSON.parse(raw));
      return parsed.success ? parsed.data : createDefaultState();
    } catch {
      return createDefaultState();
    }
  }

  function saveState(state: PersistedState): void {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private mode, quota). The app still works
      // for the current session; we just cannot persist.
    }
  }

  function update(change: (state: PersistedState) => PersistedState): PersistedState {
    const next = change(getState());
    saveState(next);
    return next;
  }

  function addKid(kid: Kid): PersistedState {
    return update((state) => ({
      ...state,
      data: { ...state.data, kids: [...state.data.kids, kid] },
    }));
  }

  function removeKid(id: string): PersistedState {
    return update((state) => ({
      ...state,
      data: { ...state.data, kids: state.data.kids.filter((kid) => kid.id !== id) },
    }));
  }

  function completeSession(draft: SessionDraft, now: Date): PersistedState {
    return update((state) => {
      const session = { id: `s${draft.at}`, ...draft };
      return {
        ...state,
        data: {
          ...state.data,
          kids: state.data.kids.map((kid) =>
            kid.id === draft.kidId ? { ...kid, lastPlayed: draft.at } : kid,
          ),
          sessions: [...state.data.sessions, session],
          streak: nextStreak(state.data, now),
          lastDay: todayKey(now),
          prideIdx: nextPrideIndex(state.data.prideIdx, pride.length),
        },
      };
    });
  }

  function deleteMoment(sessionId: string): PersistedState {
    // We keep the session (it still happened) and just clear its keepsake note.
    return update((state) => ({
      ...state,
      data: {
        ...state.data,
        sessions: state.data.sessions.map((session) =>
          session.id === sessionId ? { ...session, moment: '' } : session,
        ),
      },
    }));
  }

  function clear(): void {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }

  return { getState, saveState, addKid, removeKid, completeSession, deleteMoment, clear };
}

/** The app-wide repository instance, backed by the browser's localStorage. */
export const repository: Repository = createLocalStorageRepository();
