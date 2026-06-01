/*
 * Pure session timer state machine: a calm countdown for Special Time.
 * Driven by a hook; kept pure so pause/resume and the early-end maths are easy
 * to test without a browser.
 */

export interface TimerState {
  secondsLeft: number;
  running: boolean;
}

export interface TimerTick {
  state: TimerState;
  // True on the tick the timer reaches zero (time to end and maybe chime).
  reachedZero: boolean;
}

export function initTimer(totalSeconds: number): TimerState {
  return { secondsLeft: totalSeconds, running: true };
}

/** Advances the timer by one second. */
export function tickTimer(state: TimerState): TimerTick {
  if (!state.running || state.secondsLeft <= 0) {
    return { state, reachedZero: false };
  }
  if (state.secondsLeft <= 1) {
    return { state: { secondsLeft: 0, running: false }, reachedZero: true };
  }
  return { state: { secondsLeft: state.secondsLeft - 1, running: true }, reachedZero: false };
}

/** Pause / resume. */
export function toggleTimer(state: TimerState): TimerState {
  return { ...state, running: !state.running };
}

/**
 * Whole minutes actually played, with a floor of 1 so even a few seconds of
 * showing up "counts". Used when the parent ends early.
 */
export function minutesPlayed(totalSeconds: number, secondsLeft: number): number {
  return Math.max(1, Math.round((totalSeconds - secondsLeft) / 60));
}
