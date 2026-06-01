import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { notes, pride } from '@/lib/content';
import { daysAgo, formatLongDate } from '@/lib/date';
import { doneTodayKidIds } from '@/lib/done-today';
import { skillFor } from '@/lib/pride';
import { suggestKid } from '@/lib/whose-turn';
import { useHereStore } from '@/store/here-store';
import { useOverlayStore } from '@/store/overlay-store';

function greeting(hour: number): string {
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export function TodayScreen() {
  const navigate = useNavigate();
  const data = useHereStore((state) => state.data);
  const rotateSkill = useHereStore((state) => state.settings.rotateSkill);
  const startSession = useOverlayStore((state) => state.startSession);
  const openKids = useOverlayStore((state) => state.openKids);

  const note = useMemo(() => notes[Math.floor(Math.random() * notes.length)], []);
  const kids = data.kids;
  const suggested = suggestKid(kids);
  const doneIds = doneTodayKidIds(data.sessions);
  const skill = skillFor(data.prideIdx, rotateSkill, pride);
  const now = new Date();

  return (
    <div className="h-screen">
      <header style={{ marginBottom: 22 }}>
        <Label style={{ marginBottom: 10 }}>{formatLongDate(now)}</Label>
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            margin: 0,
            fontSize: 32,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          {greeting(now.getHours())}.
        </h1>
        <p
          style={{
            margin: '10px 0 0',
            color: 'var(--text-dim)',
            fontSize: 16,
            lineHeight: 1.5,
            textWrap: 'pretty',
          }}
        >
          {note}
        </p>
      </header>

      {suggested ? (
        <Card accent pad={0} style={{ marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ padding: '22px' }}>
            <Label style={{ color: 'var(--accent-deep)', marginBottom: 14 }}>
              {doneIds.has(suggested.id) ? 'Another round?' : 'Ready when you are'}
            </Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <Avatar kid={suggested} size={58} />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Five minutes with {suggested.name}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: 13.5, marginTop: 2 }}>
                  Last special time: {daysAgo(suggested.lastPlayed)}
                </div>
              </div>
            </div>
            <Button
              onClick={() => startSession(suggested)}
              variant="primary"
              size="lg"
              icon="play"
              style={{ width: '100%' }}
            >
              Start with {suggested.name}
            </Button>
            {kids.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 12,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {kids
                  .filter((kid) => kid.id !== suggested.id)
                  .map((kid) => (
                    <button
                      key={kid.id}
                      onClick={() => startSession(kid)}
                      className="h-chip h-tap"
                      type="button"
                    >
                      <Avatar kid={kid} size={22} /> {kid.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card accent pad={24} style={{ marginBottom: 16, textAlign: 'center' }}>
          <div
            style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}
          >
            Add your little one
          </div>
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: 14.5,
              lineHeight: 1.5,
              margin: '0 0 18px',
            }}
          >
            Just a name to begin. You can add more anytime.
          </p>
          <Button onClick={openKids} variant="primary" size="lg" icon="plus">
            Add a child
          </Button>
        </Card>
      )}

      {/* Skill to practise */}
      <Card
        pad={18}
        onClick={() => navigate('/guide')}
        style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}
        ariaLabel="Open the guide"
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            flexShrink: 0,
            background: 'var(--accent-soft)',
            color: 'var(--accent-deep)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Icon name={skill.icon} size={24} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Label style={{ marginBottom: 4 }}>Skill to practise</Label>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 17 }}>
            {skill.name} &mdash; {skill.one}
          </div>
        </div>
        <span style={{ color: 'var(--text-faint)', flexShrink: 0 }}>
          <Icon name="chevR" size={20} />
        </span>
      </Card>

      {/* Today status */}
      {kids.length > 0 && (
        <Card pad={20}>
          <Label style={{ marginBottom: 14 }}>Today</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {kids.map((kid) => {
              const done = doneIds.has(kid.id);
              return (
                <div key={kid.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar kid={kid} size={38} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{kid.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>
                      {done ? 'had your five minutes today' : `last: ${daysAgo(kid.lastPlayed)}`}
                    </div>
                  </div>
                  {done ? (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        color: 'var(--on-accent)',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                      aria-label="Done today"
                    >
                      <Icon name="check" size={17} stroke={2.3} />
                    </div>
                  ) : (
                    <button
                      onClick={() => startSession(kid)}
                      className="h-iconbtn h-tap"
                      type="button"
                      aria-label={`Start with ${kid.name}`}
                    >
                      <Icon name="play" size={17} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
