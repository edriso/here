import { NavLink, Outlet } from 'react-router-dom';
import { copy } from '@/lib/content';
import { useApplyTheme } from '@/hooks/use-apply-theme';
import { useHereStore } from '@/store/here-store';
import { useOverlayStore } from '@/store/overlay-store';
import { KidsSheet } from '@/features/kids/kids-sheet';
import { SettingsOverlay } from '@/features/settings/settings-overlay';
import { SessionHost } from '@/features/session/session-host';
import { Icon, type IconName } from './icon';

interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

const NAV: NavItem[] = [
  { to: '/', label: 'Today', icon: 'today', end: true },
  { to: '/moments', label: 'Moments', icon: 'moments' },
  { to: '/guide', label: 'Guide', icon: 'guide' },
];

/**
 * The shell around every screen: a side rail on desktop, a bottom bar on
 * mobile, the routed screen in the middle, and the session, children, and
 * settings overlays on top.
 */
export function AppLayout() {
  const theme = useHereStore((state) => state.settings.theme);
  const accent = useHereStore((state) => state.settings.accent);
  useApplyTheme(theme, accent);

  const kidsOpen = useOverlayStore((state) => state.kidsOpen);
  const settingsOpen = useOverlayStore((state) => state.settingsOpen);
  const openKids = useOverlayStore((state) => state.openKids);
  const closeKids = useOverlayStore((state) => state.closeKids);
  const openSettings = useOverlayStore((state) => state.openSettings);
  const closeSettings = useOverlayStore((state) => state.closeSettings);

  return (
    <div className="h-app">
      {/* Desktop side rail */}
      <nav className="h-rail" aria-label="Main">
        <div className="h-brand">
          <span className="h-logo">
            <span className="h-logo-big" />
            <span className="h-logo-small" />
          </span>
          <span>Here</span>
        </div>
        <div className="h-rail-items">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'h-navitem h-tap' + (isActive ? ' is-on' : '')}
            >
              <Icon name={item.icon} size={21} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={openKids}
            className="h-navitem h-tap"
            type="button"
            style={{ marginTop: 4 }}
          >
            <Icon name="today" size={21} />
            <span>Children</span>
          </button>
          <button onClick={openSettings} className="h-navitem h-tap" type="button">
            <Icon name="sliders" size={21} />
            <span>Settings</span>
          </button>
        </div>
        <div className="h-rail-foot">
          <div
            style={{
              fontFamily: 'var(--display)',
              fontStyle: 'italic',
              fontSize: 14,
              color: 'var(--text-faint)',
              lineHeight: 1.5,
            }}
          >
            {copy.tagline}
          </div>
        </div>
      </nav>

      {/* Routed screen */}
      <main className="h-main">
        <div className="h-col">
          <Outlet />
        </div>
      </main>

      {/* Mobile top controls */}
      <div className="h-mobile-top">
        <button onClick={openKids} className="h-iconbtn h-tap" type="button" aria-label="Children">
          <Icon name="today" size={20} />
        </button>
        <button
          onClick={openSettings}
          className="h-iconbtn h-tap"
          type="button"
          aria-label="Settings"
        >
          <Icon name="sliders" size={20} />
        </button>
      </div>

      {/* Mobile bottom bar */}
      <nav className="h-bottom" aria-label="Main">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => 'h-tabbtn h-tap' + (isActive ? ' is-on' : '')}
          >
            <Icon name={item.icon} size={22} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <SessionHost />
      {kidsOpen && <KidsSheet onClose={closeKids} />}
      {settingsOpen && <SettingsOverlay onClose={closeSettings} />}
    </div>
  );
}
