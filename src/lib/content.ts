/*
 * Here content, ported faithfully from the design prototype.
 *
 * "Special Time" / child-led play is the most evidence-based parent-child
 * connection ritual (Eyberg, 1970s; a core component of Parent-Child
 * Interaction Therapy). Copy is distilled from PCIT/PRIDE guidance and the
 * quality-over-quantity findings (Milkie et al., 2015). It is a gentle nudge,
 * never a test.
 */
import type { IconName } from '@/components/icon';
import type { AppData, PrideKey } from '@/types/domain';

export interface PrideSkill {
  key: PrideKey;
  name: string;
  icon: IconName;
  one: string;
  how: string;
}

export interface AvoidItem {
  not: string;
  why: string;
}

export interface Spark {
  text: string;
  age: string;
}

// ---- PRIDE skills: the proven "how" of child-led play ---------------------
export const pride: PrideSkill[] = [
  {
    key: 'P',
    name: 'Praise',
    icon: 'star',
    one: 'Praise the good stuff, specifically.',
    how: 'Notice something real and name it. "I love how carefully you stacked those." Specific praise beats a generic "good job", it tells them exactly what you saw.',
  },
  {
    key: 'R',
    name: 'Reflect',
    icon: 'mirror',
    one: 'Repeat their words back.',
    how: 'When they say something, say a version of it back. "You made it blue!" It proves you are really listening, and it grows their language without a single question.',
  },
  {
    key: 'I',
    name: 'Imitate',
    icon: 'imitate',
    one: 'Do what they do.',
    how: 'Join their game on their terms. If they are drawing, you draw. If they are crashing cars, you crash one too. Following them says: your ideas are worth copying.',
  },
  {
    key: 'D',
    name: 'Describe',
    icon: 'describe',
    one: 'Narrate, like a gentle sportscaster.',
    how: 'Calmly describe what they are doing: "You are lining the animals up in a row." No questions, no directions, just attention, out loud. Kids relax into being seen.',
  },
  {
    key: 'E',
    name: 'Enthusiasm',
    icon: 'spark',
    one: 'Let your delight show.',
    how: 'Warmth in your voice, light in your face. You do not have to be loud, just genuinely glad to be there. Your enjoyment is the thing they actually remember.',
  },
];

// The things to let go of, for these five minutes only.
export const avoid: AvoidItem[] = [
  { not: 'No questions', why: 'Questions quietly take the lead back. Describe instead of asking.' },
  { not: 'No commands', why: 'Not the boss right now. Let them direct the play.' },
  {
    not: 'No corrections',
    why: 'Resist fixing or teaching. The moment you correct, it stops being theirs.',
  },
  { not: 'No phone', why: 'Even face-down nearby, it splits your attention. Set it aside.' },
];

// ---- Play sparks: for when you do not know what to do ----------------------
export const sparks: Spark[] = [
  { text: 'Tip out a tub of blocks or Lego and build whatever they want.', age: 'all' },
  { text: 'Crayons and paper. Draw alongside them, do not draw for them.', age: 'all' },
  { text: 'Get on the floor with a few toys and let them set the whole scene.', age: '2 to 7' },
  { text: 'Soft toys or dolls, they cast the parts, you play yours.', age: '3 to 8' },
  { text: 'Head outside and simply follow wherever they go.', age: 'all' },
  { text: 'Build a pillow-and-blanket fort, their design.', age: '3 to 9' },
  { text: 'Play-dough. Make whatever they tell you to make.', age: '2 to 8' },
  { text: 'Ask them to teach you their favourite game, then let them win.', age: '6 to 12' },
];

// ---- De-guilt notes (the emotional core) ----------------------------------
export const notes: string[] = [
  'Five minutes counts. Showing up is the whole thing.',
  'If you are tired, that is okay, being there matters more than being fun.',
  'You do not have to entertain them. You only have to follow.',
  'For kids this age, the sheer hours barely move the needle. These small, warm minutes are what they keep.',
  'A stressed, guilty hour helps less than five calm minutes. Let the guilt go.',
  'You cannot do it wrong if you are there and they are leading.',
];

export const copy = {
  tagline: 'Five minutes, fully here.',
  why: 'The research is clear and kind: for young kids, how much time barely matters, it is small moments of real, undivided attention that build the bond. Five to ten minutes a day of child-led play is one of the most proven things you can do. Here just helps you actually do it.',
  phoneDown: 'Set me down nearby and play. I will chime when it is time.',
  safety:
    'Here is a gentle nudge, not a test. Some days you will miss it, and that is completely fine, there is no streak to protect and nothing to fail. Come back whenever you can.',
};

/** The soft colors a new child cycles through. */
export const KID_COLORS = ['#e0795a', '#5b9e8c', '#d9849e', '#c79a3e', '#7d8bd0', '#cf7d52'];

const ONE_DAY = 864e5;

/** The friendly first-run seed: two example children and one keepsake moment. */
export function makeSeedData(now: number): AppData {
  return {
    kids: [
      { id: 'k1', name: 'Mia', age: 4, color: '#e0795a', lastPlayed: now - 2 * ONE_DAY },
      { id: 'k2', name: 'Noah', age: 7, color: '#5b9e8c', lastPlayed: now - 5 * ONE_DAY },
    ],
    sessions: [
      {
        id: 's1',
        kidId: 'k1',
        at: now - 2 * ONE_DAY,
        minutes: 5,
        skill: 'D',
        moment: 'She narrated a whole dinosaur wedding. The T-rex cried.',
      },
    ],
    streak: 1,
    lastDay: null,
    prideIdx: 0,
  };
}
