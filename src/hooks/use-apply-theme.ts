import { useEffect } from 'react';
import { ACCENT_DEEP_MIX_COLOR, ACCENT_DEEP_MIX_PERCENT } from '@/lib/constants';

/**
 * Applies the theme and accent to the page. The "deep" accent (used for text on
 * soft fills) is derived from the accent so a single swatch drives everything.
 */
export function useApplyTheme(theme: string, accent: string): void {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty(
      '--accent-deep',
      `color-mix(in oklab, ${accent} ${ACCENT_DEEP_MIX_PERCENT}%, ${ACCENT_DEEP_MIX_COLOR})`,
    );
  }, [theme, accent]);
}
