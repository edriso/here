import { create } from 'zustand';
import type { Kid } from '@/types/domain';

/**
 * The transient overlays: the full-screen Special Time session (with the chosen
 * child), the children sheet, and the settings panel. None of this is persisted.
 */
interface OverlayState {
  sessionKid: Kid | null;
  kidsOpen: boolean;
  settingsOpen: boolean;
  startSession: (kid: Kid) => void;
  closeSession: () => void;
  openKids: () => void;
  closeKids: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  sessionKid: null,
  kidsOpen: false,
  settingsOpen: false,
  startSession: (kid) => set({ sessionKid: kid }),
  closeSession: () => set({ sessionKid: null }),
  openKids: () => set({ kidsOpen: true }),
  closeKids: () => set({ kidsOpen: false }),
  openSettings: () => set({ settingsOpen: true }),
  closeSettings: () => set({ settingsOpen: false }),
}));
