import { WorkoutPlan, WorkoutDay, Exercise, DifficultyLevel, UserProfile } from '../types';

export interface GeneratorOptions {
  frequency: number; // 2, 3, 4, 5, 6
  equipment: 'gym' | 'dumbbells' | 'bodyweight';
  focus: 'full' | 'upper' | 'lower' | 'ppl';
  difficulty: DifficultyLevel;
}

export function generateCustomWorkoutPlan(user: UserProfile, options: GeneratorOptions): WorkoutPlan {
  const bw = Math.max(40, Math.min(150, user.weight || 75));
  const diffMultiplier = options.difficulty === 1 ? 0.55 : options.difficulty === 2 ? 0.8 : 1.05;

  const planId = `custom_${Date.now()}`;
  const days: WorkoutDay[] = [];

  const roundWeight = (w: number) => Math.max(2, Math.round(w / 2.5) * 2.5);

  const benchWeight = roundWeight(bw * 0.75 * diffMultiplier);
  const squatWeight = roundWeight(bw * 0.95 * diffMultiplier);
  const deadliftWeight = roundWeight(bw * 1.15 * diffMultiplier);
  const dbPressWeight = roundWeight(bw * 0.26 * diffMultiplier);
  const dbCurlWeight = roundWeight(bw * 0.15 * diffMultiplier);
  const latPullWeight = roundWeight(bw * 0.55 * diffMultiplier);

  const freq = options.frequency;

  for (let i = 1; i <= freq; i++) {
    const dayNumber = i;
    let dayTitleRu = `День ${i}: Персональный сплит`;
    let dayTitleEn = `Day ${i}: Custom Focus`;
    let dayTitleZh = `第 ${i} 天: 个性化分化`;
    let focusRu = 'Комплексная проработка';
    let focusEn = 'Targeted overload';
    let focusZh = '专项精准负荷';

    const exercises: Exercise[] = [];

    if (options.focus === 'ppl') {
      const mode = (i - 1) % 3;
      if (mode === 0) {
        dayTitleRu = `День ${i}: Push (Толкай - Грудь и Плечи)`;
        dayTitleEn = `Day ${i}: Push (Chest & Delts)`;
        dayTitleZh = `第 ${i} 天: 推力日 (胸肌与肩部)`;
        focusRu = 'Грудные, дельты, трицепсы';
        focusEn = 'Chest, Delts, Triceps';
        focusZh = '胸、肩、三头肌';
        
        if (options.equipment === 'gym') {
          exercises.push({
            id: `ex_${i}_1`,
            name: { ru: 'Жим штанги лежа на горизонтальной скамье', en: 'Barbell Bench Press', zh: '杠铃平板卧推' },
            muscleGroup: { ru: 'Грудь и трицепс', en: 'Chest & Triceps', zh: '胸大肌' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: benchWeight,
            restSeconds: 90,
            description: { ru: 'Базовый жим с идеальным контролем траектории.', en: 'Standard bench press with high control.', zh: '控制下放，爆发推起。' }
          });
          exercises.push({
            id: `ex_${i}_2`,
            name: { ru: 'Армейский жим стоя с гантелями', en: 'Dumbbell Overhead Press', zh: '哑铃肩上推举' },
            muscleGroup: { ru: 'Плечи (передняя и средняя дельта)', en: 'Shoulders', zh: '三角肌' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: dbPressWeight,
            restSeconds: 75,
            description: { ru: 'Выжим вверх без прогиба в пояснице.', en: 'Strict vertical press overhead.', zh: '垂直推举，躯干紧绷。' }
          });
        } else if (options.equipment === 'dumbbells') {
          exercises.push({
            id: `ex_${i}_1`,
            name: { ru: 'Жим гантелей лежа на полу / скамье', en: 'Dumbbell Floor/Bench Press', zh: '哑铃卧推/地板推' },
            muscleGroup: { ru: 'Грудь', en: 'Chest', zh: '胸部肌群' },
            sets: 4,
            defaultReps: 10,
            defaultWeightKg: dbPressWeight,
            restSeconds: 75,
            description: { ru: 'Растяжение в нижней точке, сведение в верхней.', en: 'Deep contraction at top.', zh: '平稳推举，顶峰挤压。' }
          });
        } else {
          exercises.push({
            id: `ex_${i}_1`,
            name: { ru: 'Отжимания от пола с фиксацией внизу', en: 'Strict Floor Push-ups', zh: '触胸暂停俯卧撑' },
            muscleGroup: { ru: 'Грудь и трицепс', en: 'Chest & Triceps', zh: '胸肌' },
            sets: 4,
            defaultReps: 15,
            defaultWeightKg: 0,
            restSeconds: 60,
            description: { ru: 'Пауза 1 секунда у самого пола.', en: '1 second pause at floor level.', zh: '触地停顿1秒后推起。' }
          });
        }
      } else if (mode === 1) {
        dayTitleRu = `День ${i}: Pull (Тяни - Спина и Бицепс)`;
        dayTitleEn = `Day ${i}: Pull (Back & Biceps)`;
        dayTitleZh = `第 ${i} 天: 拉力日 (背部与二头)`;
        focusRu = 'Широчайшие, трапеции, бицепс';
        focusEn = 'Lats, Traps, Biceps';
        focusZh = '背阔肌、二头肌';

        if (options.equipment === 'gym') {
          exercises.push({
            id: `ex_${i}_1`,
            name: { ru: 'Тяга верхнего блока широким хватом', en: 'Wide-Grip Lat Pulldown', zh: '高位下拉' },
            muscleGroup: { ru: 'Широчайшие мышцы', en: 'Lats', zh: '背阔肌' },
            sets: 4,
            defaultReps: 10,
            defaultWeightKg: latPullWeight,
            restSeconds: 75,
            description: { ru: 'Тяга строго к ключицам, локти вниз.', en: 'Pull to collarbones, elbows down.', zh: '拉向下颌与锁骨，收紧背部。' }
          });
          exercises.push({
            id: `ex_${i}_2`,
            name: { ru: 'Тяга Т-грифа или штанги в наклоне', en: 'Barbell Row', zh: '杠铃划船' },
            muscleGroup: { ru: 'Толщина спины', en: 'Back Thickness', zh: '背部厚度' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: roundWeight(benchWeight * 0.9),
            restSeconds: 90,
            description: { ru: 'Сведение лопаток в верхней точке.', en: 'Pinch shoulder blades.', zh: '拉至腹部顶端挤压肩胛。' }
          });
        } else {
          exercises.push({
            id: `ex_${i}_1`,
            name: { ru: 'Тяга гантелей в наклоне обеими руками', en: 'Bent-Over Dumbbell Rows', zh: '俯身双臂哑铃划船' },
            muscleGroup: { ru: 'Спина', en: 'Back', zh: '背阔肌' },
            sets: 4,
            defaultReps: 12,
            defaultWeightKg: dbPressWeight,
            restSeconds: 60,
            description: { ru: 'Тяга к поясу без рывков спиной.', en: 'Pull smoothly towards hips.', zh: '平稳拉向腰侧。' }
          });
        }
      } else {
        dayTitleRu = `День ${i}: Legs & Core (Ноги и Кор)`;
        dayTitleEn = `Day ${i}: Legs & Core`;
        dayTitleZh = `第 ${i} 天: 腿部与核心`;
        focusRu = 'Бедра, ягодицы, пресс';
        focusEn = 'Quads, Hamstrings, Abs';
        focusZh = '下肢与腹部';

        exercises.push({
          id: `ex_${i}_1`,
          name: { ru: 'Приседания с акцентом на глубину', en: 'Deep Controlled Squats', zh: '全幅度深蹲' },
          muscleGroup: { ru: 'Квадрицепсы и ягодицы', en: 'Quads & Glutes', zh: '大腿与臀肌' },
          sets: 4,
          defaultReps: options.equipment === 'bodyweight' ? 20 : 8,
          defaultWeightKg: options.equipment === 'bodyweight' ? 0 : squatWeight,
          restSeconds: 90,
          description: { ru: 'Идеальная амплитуда без завала коленей.', en: 'Full depth with stable knee tracking.', zh: '全幅度平稳下蹲。' }
        });
      }
    } else {
      // Default balanced dynamic day
      dayTitleRu = `День ${i}: Атлетический баланс`;
      dayTitleEn = `Day ${i}: Athletic Balance`;
      dayTitleZh = `第 ${i} 天: 均衡进阶`;
      focusRu = 'Функциональная сила и гипертрофия';
      focusEn = 'Strength & Muscle Balance';
      focusZh = '力量与肌耐力';

      exercises.push({
        id: `ex_${i}_1`,
        name: { ru: 'Комплексный жим (штанга/гантели)', en: 'Compound Press Movement', zh: '复合推举' },
        muscleGroup: { ru: 'Грудь и плечевой пояс', en: 'Upper Body Press', zh: '上肢推力' },
        sets: 4,
        defaultReps: 10,
        defaultWeightKg: benchWeight,
        restSeconds: 80,
        description: { ru: 'Контролируемый спуск, мощный выжим.', en: 'Controlled negative, explosive drive.', zh: '离心缓慢，向心爆发。' }
      });
      exercises.push({
        id: `ex_${i}_2`,
        name: { ru: 'Приседания или выпады с отягощением', en: 'Squats or Heavy Lunges', zh: '深蹲或负重弓步' },
        muscleGroup: { ru: 'Ноги и ягодицы', en: 'Lower Body', zh: '下肢主干' },
        sets: 4,
        defaultReps: 10,
        defaultWeightKg: squatWeight,
        restSeconds: 90,
        description: { ru: 'Держите спину прямо, мощный толчок пятками.', en: 'Keep posture tall, drive through heels.', zh: '脊柱挺直，足跟发力。' }
      });
      exercises.push({
        id: `ex_${i}_3`,
        name: { ru: 'Тяговое движение на спину', en: 'Rowing Pull Movement', zh: '划船拉力动作' },
        muscleGroup: { ru: 'Широчайшие мышцы спины', en: 'Lats & Back', zh: '背肌' },
        sets: 3,
        defaultReps: 12,
        defaultWeightKg: latPullWeight,
        restSeconds: 60,
        description: { ru: 'Сведение лопаток с фиксацией.', en: 'Squeeze back at full contraction.', zh: '顶峰保持肩胛夹紧。' }
      });
    }

    days.push({
      dayNumber,
      dayTitle: { ru: dayTitleRu, en: dayTitleEn, zh: dayTitleZh },
      focus: { ru: focusRu, en: focusEn, zh: focusZh },
      exercises
    });
  }

  return {
    id: planId,
    title: {
      ru: `Персональный AI-Сплит (${user.username || 'Атлет'})`,
      en: `Custom AI Split (${user.username || 'Athlete'})`,
      zh: `AI 定制专属计划 (${user.username || '运动员'})`
    },
    description: {
      ru: `Программа рассчитана под параметры: вес ${user.weight} кг, рост ${user.height} см, возраст ${user.age} лет. Оборудование: ${options.equipment}.`,
      en: `Calibrated strictly for ${user.weight}kg, ${user.height}cm, age ${user.age}. Equipment: ${options.equipment}.`,
      zh: `基于身体数据校准：体重 ${user.weight}kg，身高 ${user.height}cm，年龄 ${user.age} 岁。器械模式：${options.equipment}。`
    },
    goal: {
      ru: options.focus === 'ppl' ? 'Максимальный рельеф и объемы' : 'Персональное гармоничное развитие',
      en: options.focus === 'ppl' ? 'Maximum Hypertrophy & Symmetry' : 'Personal Holistic Development',
      zh: options.focus === 'ppl' ? '极限形体塑造与对称增肌' : '全方位形体与身体协调发展'
    },
    difficulty: options.difficulty,
    frequencyPerWeek: options.frequency,
    estimatedMinutesPerSession: 50,
    tag: user.id || 'custom',
    isCustom: true,
    days
  };
}