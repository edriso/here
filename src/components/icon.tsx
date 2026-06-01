import type { CSSProperties, ReactElement } from 'react';

export type IconName =
  | 'today'
  | 'moments'
  | 'guide'
  | 'play'
  | 'pauseSolid'
  | 'check'
  | 'arrow'
  | 'chevR'
  | 'chevL'
  | 'x'
  | 'plus'
  | 'minus'
  | 'clock'
  | 'star'
  | 'mirror'
  | 'imitate'
  | 'describe'
  | 'spark'
  | 'heart'
  | 'sun'
  | 'moon'
  | 'trash'
  | 'edit'
  | 'bell'
  | 'leaf'
  | 'sparkles'
  | 'sliders';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
}

/**
 * The line-icon set, ported from the design prototype so the look matches
 * exactly. Decorative by default (aria-hidden).
 */
export function Icon({ name, size = 22, stroke = 1.7, style }: IconProps): ReactElement {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<IconName, ReactElement> = {
    today: (
      <>
        <circle {...p} cx="9" cy="10" r="3.3" />
        <circle {...p} cx="16.5" cy="11.5" r="2.4" />
        <path {...p} d="M3.5 19c.4-3 2.6-4.6 5.5-4.6s5.1 1.6 5.5 4.6" />
        <path {...p} d="M15 18.4c.2-1.9 1.3-3 3-3 1.5 0 2.5.8 3 2.3" />
      </>
    ),
    moments: (
      <path {...p} d="M12 20.5S4 15.5 4 9.8A4 4 0 0 1 12 7a4 4 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7Z" />
    ),
    guide: (
      <>
        <path {...p} d="M5 5.5A2.5 2.5 0 0 1 7.5 8v10a2 2 0 0 0-2-2H3.5V5.5Z" />
        <path {...p} d="M19 5.5A2.5 2.5 0 0 0 16.5 8v10a2 2 0 0 1 2-2h2V5.5Z" />
        <path {...p} d="M12 8v8" />
      </>
    ),
    play: <path {...p} d="M9 6.5 17 12l-8 5.5z" />,
    pauseSolid: <path {...p} d="M9.5 6.5v11M14.5 6.5v11" />,
    check: <path {...p} d="M5 12.5 9.5 17 19 7" />,
    arrow: <path {...p} d="M5 12h13M13 6.5 18.5 12 13 17.5" />,
    chevR: <path {...p} d="M9.5 6l6 6-6 6" />,
    chevL: <path {...p} d="M14.5 6l-6 6 6 6" />,
    x: <path {...p} d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
    minus: <path {...p} d="M5 12h14" />,
    clock: (
      <>
        <circle {...p} cx="12" cy="12" r="8.5" />
        <path {...p} d="M12 7.5V12l3 1.8" />
      </>
    ),
    star: <path {...p} d="M12 4.5l2.2 4.7 5.1.6-3.8 3.5 1 5-4.5-2.5L7.5 18l1-5L4.7 9.8l5.1-.6Z" />,
    mirror: (
      <>
        <rect {...p} x="6" y="3.5" width="12" height="17" rx="6" />
        <path {...p} d="M9 8c.8-1 2.2-1 3 0" />
      </>
    ),
    imitate: (
      <>
        <circle {...p} cx="8" cy="8" r="2.4" />
        <circle {...p} cx="16" cy="8" r="2.4" />
        <path
          {...p}
          d="M4 19c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2M12 19c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2"
        />
      </>
    ),
    describe: <path {...p} d="M4 6.5h16M4 11h16M4 15.5h10" />,
    spark: (
      <>
        <path {...p} d="M12 3v5M12 16v5M3 12h5M16 12h5" />
        <path {...p} d="M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
      </>
    ),
    heart: (
      <path {...p} d="M12 20.5S4 15.5 4 9.8A4 4 0 0 1 12 7a4 4 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7Z" />
    ),
    sun: (
      <>
        <circle {...p} cx="12" cy="12" r="4" />
        <path
          {...p}
          d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"
        />
      </>
    ),
    moon: <path {...p} d="M19 13.5A7.5 7.5 0 1 1 10.5 5a6 6 0 0 0 8.5 8.5Z" />,
    trash: <path {...p} d="M5 7h14M10 7V5h4v2M6 7l1 12h10l1-12" />,
    edit: <path {...p} d="M5 19h3l9-9-3-3-9 9zM14 6l3 3" />,
    bell: (
      <>
        <path {...p} d="M6 16V10a6 6 0 0 1 12 0v6l1.5 2.5h-15Z" />
        <path {...p} d="M10 19a2 2 0 0 0 4 0" />
      </>
    ),
    leaf: (
      <>
        <path {...p} d="M6 18C6 9 12 5 19 5c0 9-6 13-13 13Z" />
        <path {...p} d="M9 15c2-3 5-5 8-6" />
      </>
    ),
    sparkles: (
      <>
        <path {...p} d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z" />
        <path {...p} d="M18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
      </>
    ),
    sliders: (
      <>
        <path {...p} d="M4 7h9M19 7h1M4 12h1M11 12h9M4 17h6M16 17h4" />
        <circle {...p} cx="16" cy="7" r="2.1" />
        <circle {...p} cx="8" cy="12" r="2.1" />
        <circle {...p} cx="13" cy="17" r="2.1" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={style} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
