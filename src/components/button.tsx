import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './icon';

type Variant = 'primary' | 'ghost' | 'soft';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  style?: CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '10px 16px', fontSize: 14 },
  md: { padding: '14px 22px', fontSize: 15.5 },
  lg: { padding: '17px 28px', fontSize: 17 },
};

const variants: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--on-accent)',
    border: '1px solid transparent',
    boxShadow: 'var(--shadow-sm)',
  },
  ghost: { background: 'transparent', color: 'var(--text)', border: '1.5px solid var(--line)' },
  soft: {
    background: 'var(--accent-soft)',
    color: 'var(--accent-deep)',
    border: '1px solid transparent',
  },
};

/** The big, friendly pill button. Uses the display face, with optional icons. */
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  style,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const iconSize = size === 'lg' ? 21 : 18;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="h-btn h-tap"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        fontFamily: 'var(--display)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        borderRadius: 999,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </button>
  );
}
