import type { ReactNode } from 'react';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { Overlay } from '@/components/overlay';
import { ACCENT_OPTIONS, MINUTES_OPTIONS, THEME_OPTIONS } from '@/lib/constants';
import type { Minutes } from '@/types/domain';
import { useHereStore } from '@/store/here-store';

interface SettingsOverlayProps {
  onClose: () => void;
}

/** A small, accessible panel for the session and look settings. */
export function SettingsOverlay({ onClose }: SettingsOverlayProps) {
  const settings = useHereStore((state) => state.settings);
  const setTheme = useHereStore((state) => state.setTheme);
  const setAccent = useHereStore((state) => state.setAccent);
  const setMinutes = useHereStore((state) => state.setMinutes);
  const setChime = useHereStore((state) => state.setChime);
  const setRotateSkill = useHereStore((state) => state.setRotateSkill);

  return (
    <Overlay ariaLabel="Settings" onClose={onClose}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 20px',
        }}
      >
        <button onClick={onClose} className="h-iconbtn h-tap" aria-label="Close">
          <Icon name="x" size={20} />
        </button>
        <Label>Settings</Label>
        <div style={{ width: 42 }} />
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 22px 40px',
          maxWidth: 460,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Section label="Session length">
          <PillGroup
            options={MINUTES_OPTIONS.map((value) => ({
              value: String(value),
              label: `${value} min`,
            }))}
            selected={String(settings.minutes)}
            onSelect={(value) => setMinutes(Number(value) as Minutes)}
          />
        </Section>

        <Section label="End chime">
          <Toggle
            on={settings.chime}
            onToggle={() => setChime(!settings.chime)}
            title="Soft chime when time is up"
            detail="A gentle three-note sound, so you can set the phone down."
          />
        </Section>

        <Section label="Daily skill">
          <Toggle
            on={settings.rotateSkill}
            onToggle={() => setRotateSkill(!settings.rotateSkill)}
            title="Rotate the daily skill"
            detail="Practise one PRIDE skill at a time. Off keeps it on Describe."
          />
        </Section>

        <Section label="Accent">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {ACCENT_OPTIONS.map((option) => {
              const isSelected = settings.accent.toLowerCase() === option.value.toLowerCase();
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAccent(option.value)}
                  aria-label={option.label}
                  aria-pressed={isSelected}
                  className="h-tap"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: option.value,
                    border: isSelected ? '2px solid var(--text)' : '2px solid transparent',
                    boxShadow: '0 0 0 1px var(--line)',
                    cursor: 'pointer',
                  }}
                />
              );
            })}
          </div>
        </Section>

        <Section label="Theme">
          <PillGroup
            options={THEME_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
            selected={settings.theme}
            onSelect={(value) => setTheme(value === 'dark' ? 'dark' : 'warm')}
          />
        </Section>
      </div>
    </Overlay>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <Label style={{ marginBottom: 12 }}>{label}</Label>
      {children}
    </div>
  );
}

function PillGroup({
  options,
  selected,
  onSelect,
}: {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div role="group" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={isSelected}
            className="h-tap"
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14.5,
              fontWeight: 600,
              background: isSelected ? 'var(--accent-soft)' : 'transparent',
              color: isSelected ? 'var(--accent-deep)' : 'var(--text-dim)',
              border: `1px solid ${isSelected ? 'var(--accent-line)' : 'var(--line)'}`,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({
  on,
  onToggle,
  title,
  detail,
}: {
  on: boolean;
  onToggle: () => void;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className="h-tap"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 14,
        cursor: 'pointer',
        textAlign: 'left',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        color: 'inherit',
        font: 'inherit',
      }}
    >
      <span>
        <span style={{ fontWeight: 600, display: 'block' }}>{title}</span>
        <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>{detail}</span>
      </span>
      <span
        aria-hidden="true"
        style={{
          width: 44,
          height: 26,
          borderRadius: 999,
          flexShrink: 0,
          background: on ? 'var(--accent)' : 'var(--surface-2)',
          border: '1px solid var(--line)',
          position: 'relative',
          transition: 'background .2s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: on ? 'var(--on-accent)' : 'var(--text-faint)',
            transition: 'left .2s ease',
          }}
        />
      </span>
    </button>
  );
}
