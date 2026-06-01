import type { CSSProperties, ReactNode } from 'react';

/** A small uppercase, wide-tracked eyebrow label. */
export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: 'var(--ui)',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
