import { create } from 'zustand';
import { repository } from '@/lib/repository';
import type { AppData, Kid, Minutes, SessionDraft, Settings, Theme } from '@/types/domain';

interface HereState {
  settings: Settings;
  data: AppData;
  // Children and sessions.
  addKid: (kid: Kid) => void;
  removeKid: (id: string) => void;
  completeSession: (draft: SessionDraft) => void;
  deleteMoment: (sessionId: string) => void;
  // Settings.
  setTheme: (theme: Theme) => void;
  setAccent: (accent: string) => void;
  setMinutes: (minutes: Minutes) => void;
  setChime: (chime: boolean) => void;
  setRotateSkill: (rotate: boolean) => void;
}

const initial = repository.getState();

export const useHereStore = create<HereState>((set, get) => {
  function patchSettings(patch: Partial<Settings>): void {
    const settings = { ...get().settings, ...patch };
    set({ settings });
    const state = get();
    repository.saveState({ version: 1, settings, data: state.data });
  }

  return {
    settings: initial.settings,
    data: initial.data,

    addKid: (kid) => set({ data: repository.addKid(kid).data }),
    removeKid: (id) => set({ data: repository.removeKid(id).data }),
    completeSession: (draft) => set({ data: repository.completeSession(draft, new Date()).data }),
    deleteMoment: (sessionId) => set({ data: repository.deleteMoment(sessionId).data }),

    setTheme: (theme) => patchSettings({ theme }),
    setAccent: (accent) => patchSettings({ accent }),
    setMinutes: (minutes) => patchSettings({ minutes }),
    setChime: (chime) => patchSettings({ chime }),
    setRotateSkill: (rotate) => patchSettings({ rotateSkill: rotate }),
  };
});
