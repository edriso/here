import type { Kid } from '@/types/domain';

/** A soft, colored initial chip for a child (rounded square). */
export function Avatar({ kid, size = 44 }: { kid: Pick<Kid, 'name' | 'color'>; size?: number }) {
  const initial = (kid.name || '?').trim().charAt(0).toUpperCase();
  const color = kid.color || 'var(--accent)';
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '32%',
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        // The trailing "26" is a ~15% hex alpha for the soft fill.
        background: `${color}26`,
        color,
        fontFamily: 'var(--display)',
        fontWeight: 700,
        fontSize: size * 0.42,
      }}
    >
      {initial}
    </div>
  );
}
