import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Kid, SessionDraft } from '@/types/domain';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Label } from '@/components/label';
import { Overlay } from '@/components/overlay';
import { type PrideSkill, copy, sparks } from '@/lib/content';
import { playChime } from '@/lib/chime';
import { formatClock } from '@/lib/format';
import { minutesPlayed } from '@/lib/session-timer';
import { useSessionTimer } from '@/hooks/use-session-timer';

type Phase = 'prep' | 'run' | 'done';

interface SessionProps {
  kid: Kid;
  totalSeconds: number;
  skill: PrideSkill;
  chime: boolean;
  onClose: () => void;
  onComplete: (draft: SessionDraft | null) => void;
}

/**
 * The full-screen Special Time session: prep, a calm phone-down timer, then a
 * warm, de-guilting completion with an optional keepsake moment.
 */
export function Session({ kid, totalSeconds, skill, chime, onClose, onComplete }: SessionProps) {
  const [phase, setPhase] = useState<Phase>('prep');
  const [endSecondsLeft, setEndSecondsLeft] = useState(totalSeconds);
  const [sparkIndex, setSparkIndex] = useState(() => Math.floor(Math.random() * sparks.length));

  const endTo = useCallback(
    (secondsLeft: number) => {
      setEndSecondsLeft(secondsLeft);
      if (chime) {
        playChime();
      }
      setPhase('done');
    },
    [chime],
  );

  const { secondsLeft, running, toggle } = useSessionTimer(totalSeconds, phase === 'run', () =>
    endTo(0),
  );

  const background = phase === 'run' ? 'var(--bg-calm)' : 'var(--bg)';

  return (
    <Overlay ariaLabel={`Special time with ${kid.name}`} onClose={onClose} background={background}>
      {phase === 'prep' && (
        <PrepPhase
          kid={kid}
          skill={skill}
          minutes={Math.round(totalSeconds / 60)}
          spark={sparks[sparkIndex].text}
          onShuffleSpark={() => setSparkIndex((index) => (index + 1) % sparks.length)}
          onClose={onClose}
          onStart={() => setPhase('run')}
        />
      )}

      {phase === 'run' && (
        <RunPhase
          kid={kid}
          skill={skill}
          secondsLeft={secondsLeft}
          running={running}
          onToggle={toggle}
          onEnd={() => endTo(secondsLeft)}
        />
      )}

      {phase === 'done' && (
        <DonePhase
          kid={kid}
          skillKey={skill.key}
          totalSeconds={totalSeconds}
          endSecondsLeft={endSecondsLeft}
          onComplete={onComplete}
        />
      )}
    </Overlay>
  );
}

function TopBar({
  onLeftAction,
  label,
  leftLabel,
}: {
  onLeftAction: () => void;
  label: string;
  leftLabel: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        flexShrink: 0,
      }}
    >
      <button onClick={onLeftAction} className="h-iconbtn h-tap" aria-label={leftLabel}>
        <Icon name="x" size={20} />
      </button>
      <Label>{label}</Label>
      <div style={{ width: 42 }} />
    </div>
  );
}

function PrepPhase({
  kid,
  skill,
  minutes,
  spark,
  onShuffleSpark,
  onClose,
  onStart,
}: {
  kid: Kid;
  skill: PrideSkill;
  minutes: number;
  spark: string;
  onShuffleSpark: () => void;
  onClose: () => void;
  onStart: () => void;
}) {
  return (
    <>
      <TopBar onLeftAction={onClose} label="Special time" leftLabel="Close" />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            maxWidth: 460,
            margin: '0 auto',
            padding: '12px 26px 40px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar kid={kid} size={72} />
          </div>
          <h1
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: '-0.02em',
              margin: '18px 0 6px',
            }}
          >
            Five minutes with {kid.name}.
          </h1>
          <p
            style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.5, margin: '0 0 26px' }}
          >
            They lead, you follow. No teaching, no fixing, just you, fully here.
          </p>

          <Card accent pad={20} style={{ textAlign: 'left', marginBottom: 14 }}>
            <Label style={{ color: 'var(--accent-deep)', marginBottom: 10 }}>
              Today&rsquo;s one thing to try
            </Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
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
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 19 }}>
                  {skill.name} &mdash; {skill.one.replace(/\.$/, '')}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: 'var(--text-dim)',
                    marginTop: 3,
                    lineHeight: 1.45,
                    textWrap: 'pretty',
                  }}
                >
                  {skill.how}
                </div>
              </div>
            </div>
          </Card>

          <Card
            pad={16}
            style={{ textAlign: 'left', marginBottom: 26, background: 'var(--surface-2)' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <Label>If you&rsquo;re stuck</Label>
              <button
                onClick={onShuffleSpark}
                className="h-tap"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-deep)',
                  fontFamily: 'var(--ui)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Icon name="sparkles" size={14} /> another
              </button>
            </div>
            <div
              style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.5, textWrap: 'pretty' }}
            >
              {spark}
            </div>
          </Card>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              justifyContent: 'center',
              marginBottom: 20,
              color: 'var(--text-faint)',
              fontSize: 13.5,
            }}
          >
            <Icon name="bell" size={16} /> {copy.phoneDown}
          </div>
          <Button
            onClick={onStart}
            variant="primary"
            size="lg"
            icon="play"
            style={{ width: '100%' }}
          >
            Start {minutes} minutes
          </Button>
        </div>
      </div>
    </>
  );
}

function RunPhase({
  kid,
  skill,
  secondsLeft,
  running,
  onToggle,
  onEnd,
}: {
  kid: Kid;
  skill: PrideSkill;
  secondsLeft: number;
  running: boolean;
  onToggle: () => void;
  onEnd: () => void;
}) {
  return (
    <>
      <TopBar onLeftAction={onEnd} label={`With ${kid.name}`} leftLabel="End" />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 28,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 300,
            height: 300,
            display: 'grid',
            placeItems: 'center',
            marginBottom: 8,
          }}
        >
          <div
            className={running ? 'h-breathe' : ''}
            style={{
              position: 'absolute',
              width: 240,
              height: 240,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, var(--accent-soft), transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '1.5px solid var(--accent-line)',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--display)',
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--text)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatClock(secondsLeft)}
          </div>
        </div>

        <p
          style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--text-dim)',
            margin: '20px 0 0',
            maxWidth: 320,
            lineHeight: 1.5,
          }}
        >
          {running ? `${skill.name}: ${skill.one.toLowerCase()}` : 'Paused.'}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          padding: '0 24px calc(40px + env(safe-area-inset-bottom))',
        }}
      >
        <Button onClick={onToggle} variant="ghost" size="lg" icon={running ? 'pauseSolid' : 'play'}>
          {running ? 'Pause' : 'Resume'}
        </Button>
        <Button onClick={onEnd} variant="soft" size="lg" icon="check">
          We&rsquo;re done
        </Button>
      </div>
    </>
  );
}

function DonePhase({
  kid,
  skillKey,
  totalSeconds,
  endSecondsLeft,
  onComplete,
}: {
  kid: Kid;
  skillKey: SessionDraft['skill'];
  totalSeconds: number;
  endSecondsLeft: number;
  onComplete: (draft: SessionDraft | null) => void;
}) {
  const { register, handleSubmit, watch } = useForm<{ moment: string }>({
    defaultValues: { moment: '' },
  });
  const moment = watch('moment');
  const endedEarly = endSecondsLeft > totalSeconds * 0.5;

  const save = handleSubmit((data) => {
    onComplete({
      kidId: kid.id,
      at: Date.now(),
      minutes: minutesPlayed(totalSeconds, endSecondsLeft),
      skill: skillKey,
      moment: data.moment.trim(),
    });
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div
        style={{
          maxWidth: 460,
          margin: '0 auto',
          padding: 'min(8vh, 64px) 26px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'var(--accent-soft)',
            color: 'var(--accent-deep)',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 22px',
          }}
        >
          <Icon name="heart" size={44} />
        </div>
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
          }}
        >
          You showed up.
        </h1>
        <p
          style={{
            color: 'var(--text-dim)',
            fontSize: 16.5,
            lineHeight: 1.55,
            margin: '0 0 28px',
            textWrap: 'pretty',
          }}
        >
          {endedEarly
            ? `Even a couple of minutes of you, fully there, lands with ${kid.name}. That counts, really.`
            : `That is ${kid.name}'s five minutes of you, undivided. It is exactly what builds the bond, nothing fancy needed.`}
        </p>

        <form onSubmit={save}>
          <Card pad={20} style={{ textAlign: 'left', marginBottom: 22 }}>
            <Label style={{ marginBottom: 12 }}>
              Catch one moment{' '}
              <span
                style={{
                  textTransform: 'none',
                  letterSpacing: 0,
                  fontWeight: 500,
                  color: 'var(--text-faint)',
                }}
              >
                &mdash; optional
              </span>
            </Label>
            <textarea
              {...register('moment')}
              rows={3}
              placeholder={`Something ${kid.name} did or said you want to keep…`}
              aria-label="A moment to keep"
              className="h-input"
              style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
            />
          </Card>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button type="submit" variant="primary" size="lg" icon="check">
              {moment.trim() ? 'Save this moment' : 'Done'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
