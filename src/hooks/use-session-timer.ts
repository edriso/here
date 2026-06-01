import { useCallback, useEffect, useRef, useState } from 'react';
import { initTimer, type TimerState, tickTimer, toggleTimer } from '@/lib/session-timer';
import { useInterval } from './use-interval';

export interface UseSessionTimer {
  secondsLeft: number;
  running: boolean;
  toggle: () => void;
}

/**
 * Drives the pure session timer with a one-second tick, but only while the
 * session is "active" (the run phase). Calls `onReachZero` exactly once when the
 * countdown finishes. tickTimer is pure, so calling it inside the updater is
 * safe even under StrictMode's double invoke.
 */
export function useSessionTimer(
  totalSeconds: number,
  active: boolean,
  onReachZero: () => void,
): UseSessionTimer {
  const [state, setState] = useState<TimerState>(() => initTimer(totalSeconds));
  const firedRef = useRef(false);
  const onZeroRef = useRef(onReachZero);
  useEffect(() => {
    onZeroRef.current = onReachZero;
  }, [onReachZero]);

  useInterval(
    () => setState((current) => tickTimer(current).state),
    active && state.running && state.secondsLeft > 0 ? 1000 : null,
  );

  useEffect(() => {
    if (state.secondsLeft === 0 && !firedRef.current) {
      firedRef.current = true;
      onZeroRef.current();
    }
  }, [state.secondsLeft]);

  const toggle = useCallback(() => setState((current) => toggleTimer(current)), []);

  return { secondsLeft: state.secondsLeft, running: state.running, toggle };
}
