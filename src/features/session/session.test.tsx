import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Kid } from '@/types/domain';
import { pride } from '@/lib/content';
import { Session } from './session';

const kid: Kid = { id: 'k1', name: 'Mia', age: 4, color: '#e0795a', lastPlayed: null };
const skill = pride[3]; // Describe

describe('Session', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('walks prep to run to done and completes with a moment draft', async () => {
    const onComplete = vi.fn();
    render(
      <Session
        kid={kid}
        totalSeconds={120}
        skill={skill}
        chime={false}
        onClose={() => {}}
        onComplete={onComplete}
      />,
    );

    // Prep
    expect(screen.getByText('Five minutes with Mia.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Start 2 minutes/ }));

    // Run
    expect(screen.getByText('02:00')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /We.?re done/ }));

    // Done
    expect(screen.getByText('You showed up.')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('A moment to keep'), {
      target: { value: 'She built a fort.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save this moment' }));

    // react-hook-form's handleSubmit resolves on a later tick.
    await vi.waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    const draft = onComplete.mock.calls[0][0];
    expect(draft.kidId).toBe('k1');
    expect(draft.moment).toBe('She built a fort.');
    expect(draft.skill).toBe('D');
  });

  it('ends on its own when the timer runs out', () => {
    vi.useFakeTimers();
    render(
      <Session
        kid={kid}
        totalSeconds={2}
        skill={skill}
        chime={false}
        onClose={() => {}}
        onComplete={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Start/ }));
    for (let i = 0; i < 3; i += 1) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText('You showed up.')).toBeInTheDocument();
  });
});
