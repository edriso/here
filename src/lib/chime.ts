/*
 * A gentle three-note end chime via the WebAudio API. Created on a user gesture
 * (the start of a session) and wrapped in try/catch so it can never break the
 * app. It is toggleable in settings.
 */

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export function playChime(): void {
  try {
    const win = window as WindowWithWebkitAudio;
    const Ctx = window.AudioContext ?? win.webkitAudioContext;
    if (!Ctx) {
      return;
    }
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const notes: [number, number][] = [
      [660, 0],
      [880, 0.18],
      [990, 0.36],
    ];
    for (const [frequency, offset] of notes) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, now + offset);
      gain.gain.linearRampToValueAtTime(0.18, now + offset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 1.1);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + 1.2);
    }
    window.setTimeout(() => {
      if (ctx.close) {
        void ctx.close();
      }
    }, 2000);
  } catch {
    // Audio is a nicety, never essential. Ignore any failure.
  }
}
