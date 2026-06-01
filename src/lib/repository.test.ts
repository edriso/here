import { beforeEach, describe, expect, it } from 'vitest';
import type { Kid, SessionDraft } from '@/types/domain';
import { createLocalStorageRepository, type Repository } from './repository';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key: string) => map.get(key) ?? null,
    key: (index: number) => Array.from(map.keys())[index] ?? null,
    removeItem: (key: string) => {
      map.delete(key);
    },
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  } as Storage;
}

const NOW = new Date(2026, 2, 10, 12, 0, 0);

describe('localStorage repository', () => {
  let storage: Storage;
  let repo: Repository;

  beforeEach(() => {
    storage = memoryStorage();
    repo = createLocalStorageRepository(storage);
  });

  it('returns the friendly seed when nothing is stored', () => {
    const state = repo.getState();
    expect(state.version).toBe(1);
    expect(state.settings.theme).toBe('warm');
    expect(state.data.kids.length).toBeGreaterThan(0);
  });

  it('falls back to defaults on corrupt JSON', () => {
    storage.setItem('here-v1', 'not json');
    expect(repo.getState().settings.theme).toBe('warm');
  });

  it('falls back to defaults on a valid-JSON but wrong shape', () => {
    storage.setItem('here-v1', JSON.stringify({ version: 1, settings: {}, data: {} }));
    expect(repo.getState().data.kids.length).toBeGreaterThan(0);
  });

  it('adds and removes a child', () => {
    const kid: Kid = { id: 'kx', name: 'Ada', age: 3, color: '#5b9e8c', lastPlayed: null };
    const after = repo.addKid(kid);
    expect(after.data.kids.some((k) => k.id === 'kx')).toBe(true);
    expect(repo.removeKid('kx').data.kids.some((k) => k.id === 'kx')).toBe(false);
  });

  it('completes a session: updates lastPlayed, appends it, advances PRIDE', () => {
    const before = repo.getState();
    const startKids = before.data.kids.length;
    const startSessions = before.data.sessions.length;

    const draft: SessionDraft = {
      kidId: 'k1',
      at: NOW.getTime(),
      minutes: 5,
      skill: 'P',
      moment: 'A lovely fort.',
    };
    const after = repo.completeSession(draft, NOW);

    expect(after.data.kids.find((k) => k.id === 'k1')?.lastPlayed).toBe(NOW.getTime());
    expect(after.data.sessions.length).toBe(startSessions + 1);
    expect(after.data.kids.length).toBe(startKids);
    expect(after.data.prideIdx).toBe(1);
    expect(after.data.lastDay).toBe('2026-03-10');
  });

  it('deleting a moment clears its note but keeps the session', () => {
    const before = repo.getState();
    const withMoment = before.data.sessions.find((s) => s.moment);
    expect(withMoment).toBeDefined();

    const after = repo.deleteMoment(withMoment!.id);
    expect(after.data.sessions.length).toBe(before.data.sessions.length);
    expect(after.data.sessions.find((s) => s.id === withMoment!.id)?.moment).toBe('');
  });
});
