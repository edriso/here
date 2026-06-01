import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { avoid, copy, pride } from '@/lib/content';

export function GuideScreen() {
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
          The five-minute way
        </h1>
        <p
          style={{
            margin: '8px 0 0',
            color: 'var(--text-dim)',
            fontSize: 16,
            lineHeight: 1.55,
            textWrap: 'pretty',
          }}
        >
          {copy.why}
        </p>
      </header>

      <Label style={{ marginBottom: 12 }}>Try these &mdash; remember PRIDE</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {pride.map((skill) => (
          <Card
            key={skill.key}
            pad={18}
            style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
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
            <div>
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                  fontSize: 17.5,
                  marginBottom: 3,
                }}
              >
                <span style={{ color: 'var(--accent-deep)' }}>{skill.name[0]}</span>
                {skill.name.slice(1)}
              </div>
              <p
                style={{
                  margin: 0,
                  color: 'var(--text-dim)',
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  textWrap: 'pretty',
                }}
              >
                {skill.how}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Label style={{ marginBottom: 12 }}>For these five minutes, let go of</Label>
      <Card pad={8} style={{ marginBottom: 24 }}>
        {avoid.map((item, index) => (
          <div
            key={item.not}
            style={{
              display: 'flex',
              gap: 13,
              alignItems: 'flex-start',
              padding: '13px 12px',
              borderTop: index ? '1px solid var(--line)' : 'none',
            }}
          >
            <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>
              <Icon name="x" size={18} stroke={2.2} />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{item.not}</div>
              <div
                style={{
                  fontSize: 13.5,
                  color: 'var(--text-dim)',
                  marginTop: 2,
                  lineHeight: 1.45,
                  textWrap: 'pretty',
                }}
              >
                {item.why}
              </div>
            </div>
          </div>
        ))}
      </Card>

      <Card
        pad={18}
        style={{
          background: 'var(--surface-2)',
          display: 'flex',
          gap: 13,
          alignItems: 'flex-start',
        }}
      >
        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>
          <Icon name="leaf" size={19} />
        </span>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.55,
            color: 'var(--text-dim)',
            textWrap: 'pretty',
          }}
        >
          {copy.safety}
        </p>
      </Card>
    </div>
  );
}
