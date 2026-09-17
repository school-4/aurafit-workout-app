import { WorkoutPlan } from '../types';

export const DEFAULT_WORKOUT_PLANS: WorkoutPlan[] = [
  // LEVEL 1: BEGINNER (1/3)
  {
    id: 'starter_fullbody_l1',
    difficulty: 1,
    frequencyPerWeek: 3,
    estimatedMinutesPerSession: 45,
    tag: 'beginner',
    title: {
      ru: 'Full Body Фундамент',
      en: 'Full Body Foundation',
      zh: '全身基础筑基计划'
    },
    goal: {
      ru: 'Начальная адаптация, укрепление связок и мышечный тонус',
      en: 'Initial neural adaptation, joint strengthening & muscle tone',
      zh: '初阶神经适应、强化关节韧带与全身肌肉塑形'
    },
    description: {
      ru: 'Идеальный 3-дневный старт для новичков. Развивает базовые двигательные шаблоны без риска перегрузки.',
      en: 'The ideal 3-day split for beginners. Develops primary movement patterns safely.',
      zh: '初学者理想的3天全身分化，安全掌握基础复合动作模式。'
    },
    days: [
      {
        dayNumber: 1,
        dayTitle: { ru: 'День A: Толкай и Приседай', en: 'Day A: Push & Squat', zh: 'A日: 推与蹲' },
        focus: { ru: 'Квадрицепсы, грудь, плечи', en: 'Quads, Chest, Shoulders', zh: '股四头肌、胸大肌、三角肌' },
        exercises: [
          {
            id: 'goblet_squat',
            name: { ru: 'Кубковые приседания с гантелью', en: 'Goblet Squat', zh: '高脚杯哑铃深蹲' },
            muscleGroup: { ru: 'Квадрицепсы и ягодицы', en: 'Quads & Glutes', zh: '股四头肌与臀大肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 12,
            restSeconds: 60,
            description: { ru: 'Держите гантель у груди, спина ровная, колени смотрят в стороны носков.', en: 'Hold dumbbell at chest level, spine neutral, knees tracking toes.', zh: '双手托哑铃于胸前，脊柱中立，膝关节与脚尖方向一致。' }
          },
          {
            id: 'pushups_or_bench',
            name: { ru: 'Жим гантелей лежа на скамье', en: 'Flat Dumbbell Press', zh: '平板哑铃卧推' },
            muscleGroup: { ru: 'Грудные мышцы и трицепс', en: 'Chest & Triceps', zh: '胸大肌与肱三头肌' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: 14,
            restSeconds: 75,
            description: { ru: 'Опускайте гантели подконтрольно к уровню сосков, мощный выжим вверх.', en: 'Lower dumbbells with control, powerful press up without locking elbows.', zh: '控制下放哑铃至胸侧，呼气推起，顶峰短暂停顿。' }
          },
          {
            id: 'lat_pulldown',
            name: { ru: 'Тяга верхнего блока к груди', en: 'Lat Pulldown', zh: '高位下拉' },
            muscleGroup: { ru: 'Широчайшие мышцы спины', en: 'Lats & Upper Back', zh: '背阔肌与大圆肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 35,
            restSeconds: 60,
            description: { ru: 'Тяните локти вниз и назад, раскрывая грудную клетку.', en: 'Pull elbows down and back, chest proud at contraction.', zh: '挺胸下下拉，手肘向背部两侧夹紧。' }
          },
          {
            id: 'dumbbell_plank',
            name: { ru: 'Классическая планка на предплечьях', en: 'Forearm Plank', zh: '前臂核心平板支撑' },
            muscleGroup: { ru: 'Мышцы кора и пресс', en: 'Core & Abs', zh: '核心与腹直肌' },
            sets: 3,
            defaultReps: 35,
            defaultWeightKg: 0,
            restSeconds: 45,
            description: { ru: 'Тело в одну прямую линию, таз подкручен, не провисайте в пояснице (35 секунд).', en: 'Hold body in rigid straight plank line (35 seconds).', zh: '保持躯干笔直如板，核心收紧35秒。' }
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: { ru: 'День B: Тяни и Сгибай', en: 'Day B: Pull & Hinge', zh: 'B日: 拉与屈髋' },
        focus: { ru: 'Задняя поверхность бедра, спина, бицепс', en: 'Hamstrings, Back, Biceps', zh: '腘绳肌、背肌与二头肌' },
        exercises: [
          {
            id: 'db_romanian_deadlift',
            name: { ru: 'Румынская тяга с гантелями', en: 'Dumbbell Romanian Deadlift', zh: '罗马尼亚哑铃硬拉' },
            muscleGroup: { ru: 'Ягодицы и бицепс бедра', en: 'Hamstrings & Glutes', zh: '腘绳肌与臀大肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 16,
            restSeconds: 75,
            description: { ru: 'Отводите таз назад, колени слегка согнуты, растягивайте заднюю поверхность.', en: 'Hinge hips back, slight knee bend, feel hamstring stretch.', zh: '微屈膝屈髋向后推臀部，感受腘绳肌充分拉伸。' }
          },
          {
            id: 'seated_cable_row',
            name: { ru: 'Тяга горизонтального блока к поясу', en: 'Seated Cable Row', zh: '坐姿划船' },
            muscleGroup: { ru: 'Середина спины и ромбовидные', en: 'Mid Back & Rhomboids', zh: '背阔肌中束与菱形肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 30,
            restSeconds: 60,
            description: { ru: 'Сводите лопатки в конечной точке, не отклоняйте корпус назад.', en: 'Squeeze shoulder blades together, minimal torso momentum.', zh: '拉至肚脐，肩胛骨后缩夹紧，避免过度借力后仰。' }
          },
          {
            id: 'db_overhead_press',
            name: { ru: 'Жим гантелей сидя', en: 'Seated Dumbbell Shoulder Press', zh: '坐姿哑铃推举' },
            muscleGroup: { ru: 'Передняя и средняя дельты', en: 'Shoulders / Delts', zh: '三角肌前束与中束' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: 10,
            restSeconds: 60,
            description: { ru: 'Подъем гантелей вверх по дуге, без удара в верхней точке.', en: 'Press upward in a slight natural arc without clanking dumbbells.', zh: '微内收肘部顺畅推起，避免肩部弹震。' }
          },
          {
            id: 'bicep_curl_standing',
            name: { ru: 'Сгибания рук с гантелями стоя', en: 'Standing Dumbbell Bicep Curls', zh: '站姿哑铃弯举' },
            muscleGroup: { ru: 'Двуглавая мышца плеча (бицепс)', en: 'Biceps', zh: '肱二头肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 8,
            restSeconds: 50,
            description: { ru: 'Локти зафиксированы у корпуса, супинация кисти в верхней фазе.', en: 'Keep elbows pinned to sides, supinate wrists at top.', zh: '手肘紧贴躯干固定，上抬时旋外小臂。' }
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: { ru: 'День C: Комплексная активация', en: 'Day C: Dynamic Ignition', zh: 'C日: 综合激活' },
        focus: { ru: 'Все тело, координация и метаболизм', en: 'Full body balance & endurance', zh: '全身协调与耐力' },
        exercises: [
          {
            id: 'leg_press',
            name: { ru: 'Жим ногами в тренажере', en: 'Machine Leg Press', zh: '坐姿器械倒蹬' },
            muscleGroup: { ru: 'Ноги и квадрицепсы', en: 'Legs & Quads', zh: '下肢全肌群' },
            sets: 3,
            defaultReps: 15,
            defaultWeightKg: 60,
            restSeconds: 75,
            description: { ru: 'Стопы на ширине плеч, не выпрямляйте колени в замок в верхней точке.', en: 'Do not lock out knees at top. Control descent.', zh: '双脚与肩同宽，最高点切忌膝关节锁死。' }
          },
          {
            id: 'assisted_dips_or_pushups',
            name: { ru: 'Отжимания от пола / скамьи', en: 'Push-Ups (or Incline Push-Ups)', zh: '俯卧撑 / 跪姿俯卧撑' },
            muscleGroup: { ru: 'Грудь, плечи и трицепс', en: 'Chest & Triceps', zh: '胸肌与三头肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 0,
            restSeconds: 60,
            description: { ru: 'Корпус натянут, локти под углом 45 градусов к телу.', en: 'Keep body rigid, elbows at 45 degree angle to torso.', zh: '躯干紧绷，肘关节与身体夹角呈45度。' }
          },
          {
            id: 'cable_face_pull',
            name: { ru: 'Тяга троса к лицу (Face Pull)', en: 'Cable Face Pull', zh: '面拉 (Face Pull)' },
            muscleGroup: { ru: 'Задняя дельта и верх спины', en: 'Rear Delts & Rotators', zh: '三角肌后束与肩袖肌群' },
            sets: 3,
            defaultReps: 15,
            defaultWeightKg: 15,
            restSeconds: 50,
            description: { ru: 'Тяните канат к уровню лба, разводя кулаки в стороны. Здоровье плеч!', en: 'Pull rope toward forehead, separating hands. Protects shoulders.', zh: '绳索拉向额头处，大拇指朝后外旋，保护肩峰健康。' }
          }
        ]
      }
    ]
  },

  {
    id: 'starter_home_bodyweight_l1',
    difficulty: 1,
    frequencyPerWeek: 3,
    estimatedMinutesPerSession: 35,
    tag: 'home',
    title: {
      ru: 'Домашний Рельеф Без Железа',
      en: 'Home Bodyweight Sculpt',
      zh: '居家自重燃脂塑形'
    },
    goal: {
      ru: 'Сжигание жира, тонус мышц в домашних условиях',
      en: 'Fat burn, body sculpting without gym equipment',
      zh: '无器械居家燃脂减重、提升肌肉紧致度'
    },
    description: {
      ru: 'Тренировки только со своим весом тела. Отлично подходят для тренировок дома или на улице.',
      en: 'Pure bodyweight circuits designed for home or travel.',
      zh: '完全基于自身体重的无器械循环，适合居家或出差差旅。'
    },
    days: [
      {
        dayNumber: 1,
        dayTitle: { ru: 'Интенсив А: Сила и кор', en: 'Circuit A: Strength & Core', zh: '循环A: 力量与核心' },
        focus: { ru: 'Грудь, ноги, пресс', en: 'Chest, Legs, Core', zh: '胸肌、下肢与腹肌' },
        exercises: [
          {
            id: 'air_squats',
            name: { ru: 'Воздушные приседания (Air Squats)', en: 'Air Squats', zh: '自重徒手深蹲' },
            muscleGroup: { ru: 'Квадрицепсы и ягодицы', en: 'Quads & Glutes', zh: '大腿与臀大肌' },
            sets: 4,
            defaultReps: 20,
            defaultWeightKg: 0,
            restSeconds: 45,
            description: { ru: 'Глубокий подконтрольный сед, колени не заваливать внутрь.', en: 'Deep controlled squat depth, keeping chest tall.', zh: '下蹲至大腿与地面平行，挺胸目视前方。' }
          },
          {
            id: 'standard_pushups',
            name: { ru: 'Классические отжимания от пола', en: 'Classic Floor Push-ups', zh: '标准俯卧撑' },
            muscleGroup: { ru: 'Грудные мышцы', en: 'Chest & Arms', zh: '胸肌与手臂' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 0,
            restSeconds: 60,
            description: { ru: 'Полная амплитуда: грудь почти касается пола.', en: 'Full range of motion: chest kisses floor.', zh: '全程幅度，胸部接近触地后发力推起。' }
          },
          {
            id: 'mountain_climbers',
            name: { ru: 'Упражнение Скалолаз (Mountain Climbers)', en: 'Mountain Climbers', zh: '登山者 (Mountain Climbers)' },
            muscleGroup: { ru: 'Пресс и кардио', en: 'Core & Cardio', zh: '腹直肌与心肺' },
            sets: 3,
            defaultReps: 25,
            defaultWeightKg: 0,
            restSeconds: 40,
            description: { ru: 'Поочередный динамичный поднос коленей к груди в планке.', en: 'Drive knees rhythmically towards chest from plank position.', zh: '俯卧撑姿态，双膝交替高速上提至胸部。' }
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: { ru: 'Интенсив B: Баланс и осанка', en: 'Circuit B: Posterior & Balance', zh: '循环B: 稳态与后链' },
        focus: { ru: 'Спина, задняя поверхность, баланс', en: 'Back, Hamstrings, Stability', zh: '后背、腘绳肌与平衡' },
        exercises: [
          {
            id: 'glute_bridge',
            name: { ru: 'Ягодичный мостик на полу', en: 'Floor Glute Bridges', zh: '仰卧单/双腿臀桥' },
            muscleGroup: { ru: 'Ягодицы и бицепс бедра', en: 'Glutes & Hamstrings', zh: '臀大肌与下背' },
            sets: 4,
            defaultReps: 18,
            defaultWeightKg: 0,
            restSeconds: 45,
            description: { ru: 'Пауза 2 секунды в верхней точке с максимальным сжатием ягодиц.', en: 'Squeeze glutes hard at peak contraction for 2 seconds.', zh: '臀部推至顶峰挤压收紧2秒，不借力反弓腰椎。' }
          },
          {
            id: 'superman_hold',
            name: { ru: 'Лодочка (Супермен лежа на животе)', en: 'Superman Back Extension', zh: '小燕飞 / 俯卧超人挺身' },
            muscleGroup: { ru: 'Разгибатели спины', en: 'Lower Back & Spinal Erectors', zh: '竖脊肌与后背链' },
            sets: 3,
            defaultReps: 15,
            defaultWeightKg: 0,
            restSeconds: 45,
            description: { ru: 'Подъем рук и ног от пола на 2-3 секунды.', en: 'Raise chest and thighs simultaneously, hold for 2-3s.', zh: '同时轻抬双臂与双腿，感受竖脊肌收缩。' }
          },
          {
            id: 'walking_lunges',
            name: { ru: 'Выпады на месте с шагом назад', en: 'Reverse Step Lunges', zh: '后跨步箭步蹲' },
            muscleGroup: { ru: 'Бедра и ягодицы', en: 'Quads & Glutes', zh: '股四头肌与臀肌' },
            sets: 3,
            defaultReps: 14,
            defaultWeightKg: 0,
            restSeconds: 50,
            description: { ru: 'Угол в коленях 90 градусов, мягкое опускание.', en: '90 degree bend in both knees, smooth and upright.', zh: '膝盖呈90度，重心居中保持平稳。' }
          }
        ]
      }
    ]
  },

  // LEVEL 2: INTERMEDIATE (2/3)
  {
    id: 'hypertrophy_upper_lower_l2',
    difficulty: 2,
    frequencyPerWeek: 4,
    estimatedMinutesPerSession: 55,
    tag: 'hypertrophy',
    title: {
      ru: 'Верх / Низ (Upper - Lower Split)',
      en: 'Upper / Lower Hypertrophy Split',
      zh: '上下肢分化增肌计划'
    },
    goal: {
      ru: 'Качественный набор сухой мышечной массы и пропорции',
      en: 'Clean lean muscle mass hypertrophy & aesthetic proportions',
      zh: '高效精瘦肌肉增长、优化肌肉饱满度与体型比例'
    },
    description: {
      ru: 'Золотой стандарт бодибилдинга. 4 тренировки в неделю позволяют прорабатывать каждую мышечную группу дважды за 7 дней.',
      en: 'The gold standard 4-day split for optimum muscle protein synthesis and recovery.',
      zh: '健身健美黄金标准分化，每周训练4天，让每块肌群一周获得两次高品质刺激。'
    },
    days: [
      {
        dayNumber: 1,
        dayTitle: { ru: 'Верх Тела А (Тяжелый жим)', en: 'Upper Body A (Press Heavy)', zh: '上肢A (重度推力)' },
        focus: { ru: 'Грудь, спина, плечи, трицепс', en: 'Chest, Upper Back, Shoulders', zh: '胸大肌、上背、三角肌、三头肌' },
        exercises: [
          {
            id: 'barbell_bench_press',
            name: { ru: 'Жим штанги лежа на горизонтальной скамье', en: 'Barbell Bench Press', zh: '杠铃平板卧推' },
            muscleGroup: { ru: 'Грудные мышцы', en: 'Pectorals & Triceps', zh: '胸大肌中下束' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: 65,
            restSeconds: 90,
            description: { ru: 'Сведение лопаток, мост умеренный, штанга касается груди и выжимается вверх.', en: 'Retract scapulae, touch lower chest, press with intent.', zh: '肩胛骨后缩下沉，触胸后强力推起。' }
          },
          {
            id: 'barbell_bent_row',
            name: { ru: 'Тяга штанги в наклоне к поясу', en: 'Barbell Bent-Over Row', zh: '俯身杠铃划船' },
            muscleGroup: { ru: 'Широчайшие и трапеции', en: 'Lats, Rhomboids & Traps', zh: '背阔肌与斜方肌中下部' },
            sets: 4,
            defaultReps: 10,
            defaultWeightKg: 55,
            restSeconds: 90,
            description: { ru: 'Корпус под 45 градусов, тяга к низу живота, спина зафиксирована.', en: 'Torso at 45 degrees, pull barbell to lower belly.', zh: '躯干倾斜45度，杠铃平稳拉向下腹，核心紧锁。' }
          },
          {
            id: 'incline_db_press',
            name: { ru: 'Жим гантелей на наклонной скамье (30°)', en: 'Incline Dumbbell Press (30°)', zh: '30度上斜哑铃卧推' },
            muscleGroup: { ru: 'Верхняя часть грудных', en: 'Upper Clavicular Chest', zh: '胸大肌上束' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: 22,
            restSeconds: 75,
            description: { ru: 'Акцент на верх груди. Растяжение внизу, мощный толчок вверх.', en: 'Focus on clavicular head. Deep controlled stretch.', zh: '针对上胸饱满度，底部充分拉伸，顶端向内收紧。' }
          },
          {
            id: 'lat_raise_db',
            name: { ru: 'Махи гантелями через стороны (дельты)', en: 'Dumbbell Lateral Raises', zh: '哑铃侧平举' },
            muscleGroup: { ru: 'Средняя дельта (ширина плеч)', en: 'Lateral Deltoids', zh: '三角肌中束' },
            sets: 4,
            defaultReps: 15,
            defaultWeightKg: 10,
            restSeconds: 60,
            description: { ru: 'Локти слегка согнуты, движение без читинга корпусом.', en: 'Lead with elbows, strict execution without swaying.', zh: '微屈肘，手肘主导带动发力，避免摇晃身体。' }
          },
          {
            id: 'tricep_rope_pushdown',
            name: { ru: 'Разгибания на трицепс на блоке с канатом', en: 'Cable Rope Tricep Pushdown', zh: '绳索下压肱三头肌' },
            muscleGroup: { ru: 'Трицепс (латеральная головка)', en: 'Triceps Brachii', zh: '肱三头肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 25,
            restSeconds: 60,
            description: { ru: 'Разведение концов каната в нижней точке.', en: 'Spread rope handles wide at full extension.', zh: '下压到底端时双手向两侧展开，彻底压榨三头肌。' }
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: { ru: 'Низ Тела А (Квадрицепс фокус)', en: 'Lower Body A (Quad Dominant)', zh: '下肢A (股四主导)' },
        focus: { ru: 'Квадрицепсы, ягодицы, икры, пресс', en: 'Quads, Glutes, Calves', zh: '股四头肌、臀大肌与小腿' },
        exercises: [
          {
            id: 'barbell_back_squat',
            name: { ru: 'Классические приседания со штангой', en: 'Barbell Back Squat', zh: '杠铃传统后深蹲' },
            muscleGroup: { ru: 'Квадрицепсы и мышцы ног', en: 'Quads, Glutes & Adductors', zh: '大腿肌群与臀部' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: 75,
            restSeconds: 120,
            description: { ru: 'Глубина до параллели, колени в сторону стоп, опора на всю стопу.', en: 'Parallel depth or below, knees tracking toes.', zh: '蹲至大腿与地面平行或略低，全脚掌受力。' }
          },
          {
            id: 'bulgarian_split_squats',
            name: { ru: 'Болгарские сплит-приседания с гантелями', en: 'Bulgarian Split Squats', zh: '保加利亚分腿蹲' },
            muscleGroup: { ru: 'Ягодицы и квадрицепс', en: 'Glute Max & VMO', zh: '臀大肌与股四头肌' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: 14,
            restSeconds: 75,
            description: { ru: 'Задняя нога на скамье. Основной вес на передней пятке.', en: 'Rear foot elevated. Drive through front heel.', zh: '后脚搭在训练凳上，前腿后跟主导承重下蹲。' }
          },
          {
            id: 'leg_curl_seated',
            name: { ru: 'Сгибания ног в тренажере сидя', en: 'Seated Leg Hamstring Curls', zh: '坐姿腿弯举' },
            muscleGroup: { ru: 'Бицепс бедра', en: 'Hamstrings', zh: '腘绳肌' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 40,
            restSeconds: 60,
            description: { ru: 'Подконтрольный возврат в исходное положение без рывков.', en: 'Slow eccentric phase on return, avoid jerking.', zh: '离心阶段放慢速度，充分感受大腿后侧受力。' }
          },
          {
            id: 'standing_calf_raise',
            name: { ru: 'Подъемы на носки стоя (икры)', en: 'Standing Calf Raises', zh: '站姿提踵 (小腿肌群)' },
            muscleGroup: { ru: 'Икроножные мышцы', en: 'Gastrocnemius & Soleus', zh: '腓肠肌与比目鱼肌' },
            sets: 4,
            defaultReps: 15,
            defaultWeightKg: 45,
            restSeconds: 45,
            description: { ru: 'Максимальный подъем на пальцы и растяжка внизу.', en: 'Full ankle flexion at bottom, peak squeeze at top.', zh: '最低点充分下沉脚跟拉伸，最高点垫起脚尖顶峰收缩。' }
          }
        ]
      }
    ]
  },

  {
    id: 'classic_ppl_l2',
    difficulty: 2,
    frequencyPerWeek: 4,
    estimatedMinutesPerSession: 50,
    tag: 'hypertrophy',
    title: {
      ru: 'Классический Push-Pull-Legs (Тяни-Толкай-Ноги)',
      en: 'Classic Push - Pull - Legs (PPL)',
      zh: '经典推拉腿 (PPL) 分化'
    },
    goal: {
      ru: 'Сбалансированное рельефное телосложение и атлетизм',
      en: 'Aesthetic physique symmetry, strength & lean definition',
      zh: '极佳形体对称度、塑造清晰肌肉线条与力量'
    },
    description: {
      ru: 'Один из самых результативных протоколов. Мышцы делятся по кинематическим векторам движения.',
      en: 'Biomechanically optimal split based on push, pull, and leg movement patterns.',
      zh: '最经典的生物力学分化结构，按推、拉、腿动作模式高效刺激。'
    },
    days: [
      {
        dayNumber: 1,
        dayTitle: { ru: 'День Push (Толкай): Грудь, плечи, трицепс', en: 'Push Day: Chest, Shoulders, Triceps', zh: '推力日 (Push): 胸、肩、三头' },
        focus: { ru: 'Жимы, разводки, дельты', en: 'Presses & Lateral Delts', zh: '各类推举与侧平举' },
        exercises: [
          {
            id: 'incline_barbell_press',
            name: { ru: 'Жим штанги на наклонной скамье', en: 'Incline Barbell Press', zh: '上斜杠铃卧推' },
            muscleGroup: { ru: 'Верхняя часть грудных', en: 'Upper Pectorals', zh: '胸大肌上部' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: 55,
            restSeconds: 90,
            description: { ru: 'Штанга опускается на верхнюю треть груди.', en: 'Lower bar gently to upper sternum area.', zh: '杠铃平稳下放至锁骨下方胸肌上沿。' }
          },
          {
            id: 'seated_db_shoulder_press',
            name: { ru: 'Армейский жим гантелей сидя', en: 'Seated Dumbbell Shoulder Press', zh: '坐姿哑铃肩上推举' },
            muscleGroup: { ru: 'Передняя и средняя дельта', en: 'Anterior & Medial Delts', zh: '三角肌前束与中束' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: 18,
            restSeconds: 75,
            description: { ru: 'Уверенный выжим без заваливания локтей назад.', en: 'Press smoothly overhead without arching back.', zh: '核心收紧，垂直推举至头顶上方。' }
          },
          {
            id: 'cable_chest_fly',
            name: { ru: 'Сведение рук в кроссовере', en: 'Cable Chest Fly', zh: '龙门架绳索夹胸' },
            muscleGroup: { ru: 'Грудные мышцы (памп)', en: 'Chest Hypertrophy Pump', zh: '胸大肌内侧与中缝' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 15,
            restSeconds: 60,
            description: { ru: 'Обнимайте воображаемое дерево, пиковое сокращение 1 секунду.', en: 'Hug an imaginary tree, 1 sec peak contraction.', zh: '如环抱大树般弧形夹紧，顶峰收缩停顿1秒。' }
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: { ru: 'День Pull (Тяни): Спина, задняя дельта, бицепс', en: 'Pull Day: Back, Rear Delts, Biceps', zh: '拉力日 (Pull): 背、后束、二头' },
        focus: { ru: 'Ширина и толщина спины', en: 'Back Width & Thickness', zh: '背阔肌宽度与厚度' },
        exercises: [
          {
            id: 'pull_ups',
            name: { ru: 'Подтягивания на перекладине (или гравитрон)', en: 'Pull-ups (or Assisted Pull-up)', zh: '引体向上 (或辅助引体器械)' },
            muscleGroup: { ru: 'Широчайшие мышцы спины', en: 'Latissimus Dorsi', zh: '背阔肌' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: 0,
            restSeconds: 90,
            description: { ru: 'Подбородок выше перекладины, сведение лопаток.', en: 'Chin over bar, drive elbows down into your back.', zh: '下巴过杠，肘关节向下向背部挤压。' }
          },
          {
            id: 'one_arm_db_row',
            name: { ru: 'Тяга гантели к поясу одной рукой', en: 'One-Arm Dumbbell Row', zh: '单臂哑铃俯身划船' },
            muscleGroup: { ru: 'Широчайшая и середина спины', en: 'Lats & Rhomboids', zh: '背阔肌单侧孤立' },
            sets: 3,
            defaultReps: 10,
            defaultWeightKg: 24,
            restSeconds: 60,
            description: { ru: 'Тяните гантель к карману бедра, чувствуйте широчайшую.', en: 'Pull dumbbell toward hip pocket, feel lat engage.', zh: '哑铃沿弧线拉向髋关节侧口袋，顶峰挤压背部。' }
          },
          {
            id: 'incline_db_curl',
            name: { ru: 'Сгибания на бицепс на наклонной скамье', en: 'Incline Dumbbell Bicep Curls', zh: '上斜仰卧哑铃弯举' },
            muscleGroup: { ru: 'Длинная головка бицепса', en: 'Long Head Biceps', zh: '肱二头肌长头' },
            sets: 3,
            defaultReps: 12,
            defaultWeightKg: 10,
            restSeconds: 60,
            description: { ru: 'Глубокое растяжение бицепса в нижней точке.', en: 'Maximum stretch at bottom on inclined bench.', zh: '仰卧斜凳，下垂时手臂完全拉伸二头肌。' }
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: { ru: 'День Legs (Ноги): Квадрицепсы, бицепс бедра, икры', en: 'Leg Day: Quads, Hams, Calves', zh: '腿部日 (Legs): 股四、腘绳、小腿' },
        focus: { ru: 'Мощь и объем ног', en: 'Leg Volume & Power', zh: '下肢整体负荷' },
        exercises: [
          {
            id: 'hack_squat_or_press',
            name: { ru: 'Приседания в Гакк-тренажере', en: 'Hack Squat Machine', zh: '哈克深蹲器械' },
            muscleGroup: { ru: 'Квадрицепсы', en: 'Quad Hypertrophy', zh: '股四头肌' },
            sets: 4,
            defaultReps: 10,
            defaultWeightKg: 60,
            restSeconds: 90,
            description: { ru: 'Глубокий присед без отрыва пяток от платформы.', en: 'Controlled depth, heels firmly planted.', zh: '脚后跟牢牢贴紧踏板，慢速控制下蹲。' }
          },
          {
            id: 'romanian_deadlift_bb',
            name: { ru: 'Румынская становая тяга со штангой', en: 'Barbell Romanian Deadlift (RDL)', zh: '杠铃罗马尼亚硬拉' },
            muscleGroup: { ru: 'Бицепс бедра и ягодицы', en: 'Posterior Chain & Hamstrings', zh: '腘绳肌与后链' },
            sets: 4,
            defaultReps: 10,
            defaultWeightKg: 65,
            restSeconds: 90,
            description: { ru: 'Штанга скользит по ногам, таз назад, спина прямая.', en: 'Bar grazes shins, push butt back, spine straight.', zh: '杠铃贴紧小腿滑下，臀部主动后移，腰背挺直。' }
          }
        ]
      }
    ]
  },

  // LEVEL 3: PRO / ADVANCED (3/3)
  {
    id: 'pro_heavy_powerlifting_l3',
    difficulty: 3,
    frequencyPerWeek: 4,
    estimatedMinutesPerSession: 70,
    tag: 'strength',
    title: {
      ru: 'Heavy Duty Силовой Пауэрлифтинг',
      en: 'Heavy Duty Power & Strength',
      zh: '重型极限力量举计划'
    },
    goal: {
      ru: 'Максимальная взрывная сила, абсолютная мощь в «Большой тройке»',
      en: 'Maximum absolute strength & progressive overload in Big 3',
      zh: '极限绝对力量突破、精进深蹲卧推硬拉三大项实力'
    },
    description: {
      ru: 'Программа для опытных спортсменов. Тяжелые субмаксимальные веса, длительный отдых и нервно-мышечная сверхнагрузка.',
      en: 'Advanced protocol focused on submaximal heavy loads, long rest, and central nervous system recruitment.',
      zh: '专为高级力量训练者打造，针对中枢神经强募集、高强度与极限发力。'
    },
    days: [
      {
        dayNumber: 1,
        dayTitle: { ru: 'День 1: Тяжелый Присед и Силовая Подсобка', en: 'Day 1: Heavy Squat & Core Support', zh: '第1天: 重度深蹲与核心强化' },
        focus: { ru: 'Приседания со штангой, квадрицепсы', en: 'Squat 1RM Progress, Quads', zh: '深蹲主项突破' },
        exercises: [
          {
            id: 'heavy_competition_squat',
            name: { ru: 'Приседания со штангой на спине (Соревновательные)', en: 'Competition Barbell Squat', zh: '力量举比赛标准后深蹲' },
            muscleGroup: { ru: 'Квадрицепсы, ягодицы, кор', en: 'Quads, Posterior Chain, Core', zh: '全身力量主干' },
            sets: 5,
            defaultReps: 5,
            defaultWeightKg: 105,
            restSeconds: 180,
            description: { ru: 'Жесткий вдох в живот (маневр Вальсальвы), фиксация спины, досед ниже параллели.', en: 'Valsalva breathing, rigid brace, below parallel.', zh: '腹腔瓦式加压锁紧，下蹲深度低于平行线，爆发起立。' }
          },
          {
            id: 'heavy_pause_squat',
            name: { ru: 'Приседания с 2-секундной паузой в седе', en: '2-Second Pause Squats', zh: '底端停顿2秒深蹲' },
            muscleGroup: { ru: 'Взрывная сила ног из мертвой точки', en: 'Dead-Stop Explosive Power', zh: '消除牵张反射爆发力' },
            sets: 3,
            defaultReps: 4,
            defaultWeightKg: 85,
            restSeconds: 150,
            description: { ru: 'Полная остановка в нижней точке без расслабления кора, затем взрывной подъем.', en: 'Dead stop at bottom without relaxing core, explode up.', zh: '底端静止停滞2秒不晃动，瞬间强推起立。' }
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: { ru: 'День 2: Тяжелый Жим Лежа', en: 'Day 2: Heavy Bench Press Focus', zh: '第2天: 重度卧推专项' },
        focus: { ru: 'Жим штанги лежа, трицепс, мост', en: 'Bench Press, Triceps Lockout', zh: '平板卧推与三头闭锁力量' },
        exercises: [
          {
            id: 'competition_bench_press',
            name: { ru: 'Соревновательный жим лежа с паузой на груди', en: 'Paused Competition Bench Press', zh: '停顿标准平板卧推' },
            muscleGroup: { ru: 'Грудь, передняя дельта, трицепс', en: 'Chest, Anterior Delts, Triceps', zh: '胸大肌与推力链' },
            sets: 5,
            defaultReps: 5,
            defaultWeightKg: 85,
            restSeconds: 150,
            description: { ru: 'Четкая секундная пауза на груди без отрыва таза.', en: 'Distinct 1-second chest pause, leg drive engaged.', zh: '杠铃触胸静止停滞1秒，下肢借力支撑，强劲推起。' }
          },
          {
            id: 'close_grip_bench_press',
            name: { ru: 'Жим узким хватом для локаута трицепса', en: 'Close-Grip Bench Press', zh: '窄距卧推 (锁定臂力)' },
            muscleGroup: { ru: 'Трицепс и внутренняя часть груди', en: 'Triceps Lockout Power', zh: '肱三头肌闭锁力量' },
            sets: 4,
            defaultReps: 6,
            defaultWeightKg: 70,
            restSeconds: 120,
            description: { ru: 'Хват на ширине плеч, локти скользят вдоль корпуса.', en: 'Shoulder-width grip, elbows tucked to sides.', zh: '握距与肩同宽，手肘内夹下压。' }
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: { ru: 'День 3: Мертвая Тяга (Deadlift Day)', en: 'Day 3: Heavy Deadlift Mastery', zh: '第3天: 极限硬拉王者' },
        focus: { ru: 'Становая тяга, спина, хват', en: 'Deadlift, Entire Posterior Chain', zh: '传统硬拉与全身后链' },
        exercises: [
          {
            id: 'conventional_deadlift',
            name: { ru: 'Классическая становая тяга с помоста', en: 'Conventional Deadlift', zh: '传统杠铃硬拉' },
            muscleGroup: { ru: 'Вся задняя цепь, трапеции, хват', en: 'Full Posterior Chain & Traps', zh: '全身背肌后链与握力' },
            sets: 5,
            defaultReps: 4,
            defaultWeightKg: 125,
            restSeconds: 180,
            description: { ru: 'Штанга прижата к голени, мощный срыв ногами, дотягивание ягодицами.', en: 'Bar touching shins, push floor away with feet, lock with glutes.', zh: '蹬地启动发力，杠铃紧贴胫骨滑起，顶端臀部锁死。' }
          }
        ]
      }
    ]
  },

  {
    id: 'pro_calisthenics_titan_l3',
    difficulty: 3,
    frequencyPerWeek: 4,
    estimatedMinutesPerSession: 60,
    tag: 'calisthenics',
    title: {
      ru: 'Воркаут Титан (Продвинутая Калистеника)',
      en: 'Calisthenics Titan Pro',
      zh: '街健泰坦 (高阶自重神技)'
    },
    goal: {
      ru: 'Сила собственного веса, выходы силой и контроль тела в пространстве',
      en: 'Elite relative bodyweight strength, muscle-ups & isometric levers',
      zh: '极限制空力量、单杠暴力上杠与体能掌控'
    },
    description: {
      ru: 'Продвинутый калистенический комплекс с элементами дополнительного отягощения на поясе (Streetlifting).',
      en: 'Advanced weighted calisthenics (streetlifting) and high-leverage gymnastics movements.',
      zh: '进阶负重街头健身与高杠体操动作，塑造无脂肌肉铠甲。'
    },
    days: [
      {
        dayNumber: 1,
        dayTitle: { ru: 'Тяжелый Верх: Выходы и Отягощение', en: 'Upper Power: Muscle-Ups & Weighted', zh: '上肢极限爆发: 暴力上杠与负重' },
        focus: { ru: 'Взрывная сила спины и груди', en: 'Explosive Pull & Dip Power', zh: '高爆发拉伸与臂屈伸' },
        exercises: [
          {
            id: 'weighted_pullups',
            name: { ru: 'Подтягивания с весом на поясе (+15 кг)', en: 'Weighted Pull-Ups (+15kg)', zh: '负重引体向上 (+15kg)' },
            muscleGroup: { ru: 'Широчайшие и бицепс', en: 'Lats & Forearms', zh: '背阔肌与握力' },
            sets: 4,
            defaultReps: 6,
            defaultWeightKg: 15,
            restSeconds: 120,
            description: { ru: 'Чистые подтягивания с дополнительным блином на поясе.', en: 'Strict explosive chin-over-bar pull-ups with belt weight.', zh: '负重带挂铁片，无晃动下颏稳固过杠。' }
          },
          {
            id: 'weighted_dips',
            name: { ru: 'Отжимания на брусьях с отягощением (+20 кг)', en: 'Weighted Parallel Bar Dips (+20kg)', zh: '双杠臂屈伸负重 (+20kg)' },
            muscleGroup: { ru: 'Нижняя часть груди и трицепс', en: 'Chest & Heavy Triceps', zh: '胸肌下束与粗壮三头' },
            sets: 4,
            defaultReps: 8,
            defaultWeightKg: 20,
            restSeconds: 120,
            description: { ru: 'Угол в локтях 90 градусов, стабилизация корпуса.', en: '90 degree depth, lock out with control.', zh: '下沉至肘部90度，顶端稳稳闭锁。' }
          }
        ]
      }
    ]
  }
];