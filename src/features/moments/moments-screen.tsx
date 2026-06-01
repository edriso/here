import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { formatFullDate } from '@/lib/date';
import { useHereStore } from '@/store/here-store';

export function MomentsScreen() {
  const data = useHereStore((state) => state.data);
  const deleteMoment = useHereStore((state) => state.deleteMoment);

  const moments = data.sessions
    .filter((session) => session.moment)
    .slice()
    .reverse();
  const kidById = (id: string) =>
    data.kids.find((kid) => kid.id === id) ?? { name: '?', color: 'var(--accent)' };

  return (
    <div className="h-screen">
      <header style={{ marginBottom: 22 }}>
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            margin: 0,
            fontSize: 32,
            letterSpacing: '-0.025em',
          }}
        >
          Moments
        </h1>
        <p
          style={{
            margin: '8px 0 0',
            color: 'var(--text-dim)',
            fontSize: 16,
            lineHeight: 1.5,
            textWrap: 'pretty',
          }}
        >
          The little things you caught. Not a scoreboard, a keepsake.
        </p>
      </header>

      {moments.length === 0 ? (
        <Card pad={28} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--surface-2)',
              color: 'var(--accent)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Icon name="heart" size={30} />
          </div>
          <div
            style={{
              color: 'var(--text-dim)',
              fontSize: 15,
              lineHeight: 1.55,
              maxWidth: 280,
              margin: '0 auto',
            }}
          >
            Nothing here yet. After a session, jot one sweet or funny thing, it&rsquo;ll live here.
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {moments.map((session) => {
            const kid = kidById(session.kidId);
            return (
              <Card key={session.id} pad={18}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
                  <Avatar kid={kid} size={34} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5 }}>{kid.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>
                      {formatFullDate(new Date(session.at))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMoment(session.id)}
                    className="h-iconbtn h-tap"
                    type="button"
                    aria-label="Delete moment"
                    style={{ width: 34, height: 34 }}
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 18,
                    lineHeight: 1.45,
                    color: 'var(--text)',
                    margin: 0,
                    textWrap: 'pretty',
                  }}
                >
                  &ldquo;{session.moment}&rdquo;
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
