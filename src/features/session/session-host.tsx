import { pride } from '@/lib/content';
import { skillFor } from '@/lib/pride';
import { useHereStore } from '@/store/here-store';
import { useOverlayStore } from '@/store/overlay-store';
import { Session } from './session';

/** Mounts the Special Time session when a child is chosen, wired to the stores. */
export function SessionHost() {
  const kid = useOverlayStore((state) => state.sessionKid);
  const close = useOverlayStore((state) => state.closeSession);
  const settings = useHereStore((state) => state.settings);
  const prideIdx = useHereStore((state) => state.data.prideIdx);
  const completeSession = useHereStore((state) => state.completeSession);

  if (!kid) {
    return null;
  }

  return (
    <Session
      key={kid.id}
      kid={kid}
      totalSeconds={settings.minutes * 60}
      skill={skillFor(prideIdx, settings.rotateSkill, pride)}
      chime={settings.chime}
      onClose={close}
      onComplete={(draft) => {
        close();
        if (draft) {
          completeSession(draft);
        }
      }}
    />
  );
}
