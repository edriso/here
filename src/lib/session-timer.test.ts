import { describe, expect, it } from 'vitest';
import { initTimer, minutesPlayed, tickTimer, toggleTimer } from './session-timer';

describe('session-timer', () => {
  it('starts running with the full duration', () => {
    expect(initTimer(300)).toEqual({ secondsLeft: 300, running: true });
  });

  it('counts down by one second', () => {
    const result = tickTimer({ secondsLeft: 300, running: true });
    expect(result.state).toEqual({ secondsLeft: 299, running: true });
    expect(result.reachedZero).toBe(false);
  });

  it('does not count down while paused', () => {
    const paused = { secondsLeft: 120, running: false };
    expect(tickTimer(paused).state).toBe(paused);
  });

  it('reaches zero and stops on the final tick', () => {
    const result = tickTimer({ secondsLeft: 1, running: true });
    expect(result.state).toEqual({ secondsLeft: 0, running: false });
    expect(result.reachedZero).toBe(true);
  });

  it('toggles pause and resume', () => {
    expect(toggleTimer({ secondsLeft: 10, running: true }).running).toBe(false);
    expect(toggleTimer({ secondsLeft: 10, running: false }).running).toBe(true);
  });

  describe('minutesPlayed', () => {
    it('is the full length when the timer runs out', () => {
      expect(minutesPlayed(300, 0)).toBe(5);
    });

    it('rounds the minutes actually played', () => {
      expect(minutesPlayed(600, 180)).toBe(7); // 420s played -> 7 min
    });

    it('has a floor of 1, so even a few seconds counts', () => {
      expect(minutesPlayed(300, 290)).toBe(1);
    });
  });
});
