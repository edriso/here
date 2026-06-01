import type { Minutes, Theme } from '@/types/domain';

export const MINUTES_OPTIONS: Minutes[] = [5, 10, 15];

export const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'warm', label: 'Warm' },
  { value: 'dark', label: 'Dark' },
];

/** Warm accent swatches offered as a tweak. */
export interface AccentOption {
  id: string;
  label: string;
  value: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { id: 'coral', label: 'Coral', value: '#e0795a' },
  { id: 'rose', label: 'Rose', value: '#d9849e' },
  { id: 'amber', label: 'Amber', value: '#c79a3e' },
  { id: 'sage', label: 'Sage', value: '#5b9e8c' },
  { id: 'periwinkle', label: 'Periwinkle', value: '#7d8bd0' },
];

// The "deep" accent (for text on soft fills) is derived from the accent by
// mixing it toward this warm brown.
export const ACCENT_DEEP_MIX_COLOR = '#5a2a18';
export const ACCENT_DEEP_MIX_PERCENT = 78;
