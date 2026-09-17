import { Language } from '../types';

export interface RankInfo {
  tier: number;
  name: {
    ru: string;
    en: string;
    zh: string;
  };
  titleBadge: string;
  minXp: number;
  maxXp: number;
  icon: string;
  quote: {
    ru: string;
    en: string;
    zh: string;
  };
  accentColor: string; // monochrome gradient / glow
}

export const RANKS: RankInfo[] = [
  {
    tier: 1,
    name: {
      ru: 'Железный Новичок',
      en: 'Iron Novice',
      zh: '铁铸新秀'
    },
    titleBadge: 'TIER I',
    minXp: 0,
    maxXp: 500,
    icon: '🦾',
    quote: {
      ru: 'Каждый чемпион когда-то начинал с первого шага.',
      en: 'Every champion started with a single step.',
      zh: '每个冠军都始于第一步。'
    },
    accentColor: 'from-zinc-500 to-zinc-700'
  },
  {
    tier: 2,
    name: {
      ru: 'Стальной Атлет',
      en: 'Steel Athlete',
      zh: '钢铁运动员'
    },
    titleBadge: 'TIER II',
    minXp: 500,
    maxXp: 1500,
    icon: '⚡',
    quote: {
      ru: 'Твое тело адаптируется к железу. Дисциплина растет.',
      en: 'Your body adapts to iron. Discipline rises.',
      zh: '你的身体开始适应钢铁，自律在此建立。'
    },
    accentColor: 'from-zinc-400 to-zinc-600'
  },
  {
    tier: 3,
    name: {
      ru: 'Бронзовый Воин',
      en: 'Bronze Warrior',
      zh: '青铜战士'
    },
    titleBadge: 'TIER III',
    minXp: 1500,
    maxXp: 3500,
    icon: '🛡️',
    quote: {
      ru: 'Усталость отступает перед твоей силой воли.',
      en: 'Fatigue yields before your iron willpower.',
      zh: '疲劳在你钢铁般的意志前退缩。'
    },
    accentColor: 'from-amber-700 to-zinc-600'
  },
  {
    tier: 4,
    name: {
      ru: 'Серебряный Гладиатор',
      en: 'Silver Gladiator',
      zh: '白银角斗士'
    },
    titleBadge: 'TIER IV',
    minXp: 3500,
    maxXp: 7000,
    icon: '⚔️',
    quote: {
      ru: 'Никаких оправданий. Только идеальные повторения.',
      en: 'No excuses. Pure execution and pristine reps.',
      zh: '没有任何借口，唯有纯粹执行。'
    },
    accentColor: 'from-slate-300 to-zinc-500'
  },
  {
    tier: 5,
    name: {
      ru: 'Золотой Титан',
      en: 'Golden Titan',
      zh: '黄金泰坦'
    },
    titleBadge: 'TIER V',
    minXp: 7000,
    maxXp: 13000,
    icon: '🏆',
    quote: {
      ru: 'Вес кажется легким, когда в тебе пробуждается титан.',
      en: 'The weights feel light when the titan awakens within.',
      zh: '当内心的泰坦苏醒，重物已轻如鸿毛。'
    },
    accentColor: 'from-amber-400 to-zinc-400'
  },
  {
    tier: 6,
    name: {
      ru: 'Платиновый Берсерк',
      en: 'Platinum Berserker',
      zh: '白金狂战士'
    },
    titleBadge: 'TIER VI',
    minXp: 13000,
    maxXp: 22000,
    icon: '🔥',
    quote: {
      ru: 'Преодоление отказов — это твоя повседневная стихия.',
      en: 'Breaking beyond failure is your natural state of mind.',
      zh: '突破力竭是你最原始的天性。'
    },
    accentColor: 'from-zinc-100 to-slate-400'
  },
  {
    tier: 7,
    name: {
      ru: 'Алмазный Джаггернаут',
      en: 'Diamond Juggernaut',
      zh: '钻石主宰'
    },
    titleBadge: 'TIER VII',
    minXp: 22000,
    maxXp: 36000,
    icon: '💎',
    quote: {
      ru: 'Несокрушимая физическая форма. Тебя не остановить.',
      en: 'Indomitable power. Nothing in this gym can halt you.',
      zh: '所向披靡的力量，无人可挡。'
    },
    accentColor: 'from-cyan-200 to-zinc-400'
  },
  {
    tier: 8,
    name: {
      ru: 'Бог Олимпа',
      en: 'God of Olympus',
      zh: '奥林匹斯之神'
    },
    titleBadge: 'MAX TIER',
    minXp: 36000,
    maxXp: 100000,
    icon: '👑',
    quote: {
      ru: 'Высшая ступень совершенства. Легенда зала.',
      en: 'Supreme pinnacle of human performance. Living legend.',
      zh: '力量的至臻巅峰，健身殿堂的活传奇。'
    },
    accentColor: 'from-white via-zinc-200 to-zinc-500'
  }
];

export function getRankByXp(xp: number): RankInfo {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function getRankProgress(xp: number): {
  currentRank: RankInfo;
  nextRank: RankInfo | null;
  progressPercent: number;
  xpToNext: number;
} {
  const currentRank = getRankByXp(xp);
  const nextRank = RANKS.find(r => r.tier === currentRank.tier + 1) || null;

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progressPercent: 100,
      xpToNext: 0
    };
  }

  const range = nextRank.minXp - currentRank.minXp;
  const currentInTier = xp - currentRank.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentInTier / range) * 100)));
  const xpToNext = Math.max(0, nextRank.minXp - xp);

  return {
    currentRank,
    nextRank,
    progressPercent,
    xpToNext
  };
}