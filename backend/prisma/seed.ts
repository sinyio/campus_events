import { PrismaClient, CategoryType } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Создаем категории
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Конференции' },
      update: {},
      create: {
        name: 'Конференции',
        type: CategoryType.CONFERENCES,
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Экскурсии' },
      update: {},
      create: {
        name: 'Экскурсии',
        type: CategoryType.EXCURSIONS,
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Соревнования' },
      update: {},
      create: {
        name: 'Соревнования',
        type: CategoryType.COMPETITIONS,
        imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Карьера' },
      update: {},
      create: {
        name: 'Карьера',
        type: CategoryType.CAREER,
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Тренинги' },
      update: {},
      create: {
        name: 'Тренинги',
        type: CategoryType.TRAININGS,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Университетская жизнь' },
      update: {},
      create: {
        name: 'Университетская жизнь',
        type: CategoryType.UNIVERSITY_LIFE,
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Наука' },
      update: {},
      create: {
        name: 'Наука',
        type: CategoryType.SCIENCE,
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Спорт' },
      update: {},
      create: {
        name: 'Спорт',
        type: CategoryType.SPORTS,
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop&w=800&h=600',
      },
    }),
  ]);
  console.log('Created categories:', categories);

  // Создаем события
  const events = await Promise.all([
    // Прошедшие события (15 штук)
    prisma.event.create({
      data: {
        title: 'Международная конференция по искусственному интеллекту',
        description: 'Ежегодная конференция, посвященная последним достижениям в области ИИ',
        startTime: new Date('2025-05-01T09:00:00Z'),
        endTime: new Date('2025-05-03T18:00:00Z'),
        location: 'Главный корпус, Конференц-зал',
        category: { connect: { id: categories[0].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в Технопарк',
        description: 'Знакомство с инновационными стартапами и технологическими компаниями',
        startTime: new Date('2025-05-05T10:00:00Z'),
        endTime: new Date('2025-05-05T16:00:00Z'),
        location: 'Технопарк "Инновации"',
        category: { connect: { id: categories[1].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Хакатон по веб-разработке',
        description: '48-часовой марафон по созданию веб-приложений',
        startTime: new Date('2025-05-07T10:00:00Z'),
        endTime: new Date('2025-05-09T18:00:00Z'),
        location: 'IT-центр университета',
        category: { connect: { id: categories[2].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Ярмарка вакансий IT-компаний',
        description: 'Встреча с ведущими IT-компаниями и возможность получить работу',
        startTime: new Date('2025-05-10T11:00:00Z'),
        endTime: new Date('2025-05-10T17:00:00Z'),
        location: 'Студенческий центр',
        category: { connect: { id: categories[3].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Тренинг по публичным выступлениям',
        description: 'Развитие навыков эффективной коммуникации и презентации',
        startTime: new Date('2025-05-12T14:00:00Z'),
        endTime: new Date('2025-05-12T18:00:00Z'),
        location: 'Аудитория 301',
        category: { connect: { id: categories[4].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Весенний фестиваль',
        description: 'Торжественное мероприятие для студентов',
        startTime: new Date('2025-05-14T19:00:00Z'),
        endTime: new Date('2025-05-14T23:00:00Z'),
        location: 'Актовый зал',
        category: { connect: { id: categories[5].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Научный семинар по квантовым вычислениям',
        description: 'Обсуждение последних достижений в области квантовых технологий',
        startTime: new Date('2025-05-15T15:00:00Z'),
        endTime: new Date('2025-05-15T18:00:00Z'),
        location: 'Научная библиотека, Конференц-зал',
        category: { connect: { id: categories[6].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Турнир по волейболу между факультетами',
        description: 'Ежегодные соревнования по волейболу среди студентов',
        startTime: new Date('2025-05-16T10:00:00Z'),
        endTime: new Date('2025-05-16T18:00:00Z'),
        location: 'Спортивный комплекс',
        category: { connect: { id: categories[7].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Мастер-класс по робототехнике',
        description: 'Практическое занятие по сборке и программированию роботов',
        startTime: new Date('2025-05-17T14:00:00Z'),
        endTime: new Date('2025-05-17T17:00:00Z'),
        location: 'Лаборатория робототехники',
        category: { connect: { id: categories[0].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в Музей науки',
        description: 'Знакомство с интерактивными экспонатами и научными экспериментами',
        startTime: new Date('2025-05-18T11:00:00Z'),
        endTime: new Date('2025-05-18T15:00:00Z'),
        location: 'Музей науки и техники',
        category: { connect: { id: categories[1].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Чемпионат по киберспорту',
        description: 'Соревнования по популярным компьютерным играм среди студентов',
        startTime: new Date('2025-05-19T12:00:00Z'),
        endTime: new Date('2025-05-19T20:00:00Z'),
        location: 'Компьютерный центр',
        category: { connect: { id: categories[2].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Встреча с HR-специалистами',
        description: 'Семинар по подготовке резюме и прохождению собеседований',
        startTime: new Date('2025-05-20T15:00:00Z'),
        endTime: new Date('2025-05-20T18:00:00Z'),
        location: 'Конференц-зал',
        category: { connect: { id: categories[3].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Тренинг по тайм-менеджменту',
        description: 'Практические техники эффективного управления временем',
        startTime: new Date('2025-05-21T13:00:00Z'),
        endTime: new Date('2025-05-21T16:00:00Z'),
        location: 'Аудитория 205',
        category: { connect: { id: categories[4].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Фестиваль культур',
        description: 'Праздник национальных культур с выступлениями и дегустацией блюд',
        startTime: new Date('2025-05-22T14:00:00Z'),
        endTime: new Date('2025-05-22T22:00:00Z'),
        location: 'Студенческий парк',
        category: { connect: { id: categories[5].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Научный форум по биотехнологиям',
        description: 'Презентация исследований и дискуссии о будущем биотехнологий',
        startTime: new Date('2025-05-23T09:00:00Z'),
        endTime: new Date('2025-05-23T17:00:00Z'),
        location: 'Научный центр',
        category: { connect: { id: categories[6].id } },
      },
    }),

    // Текущие события (15 штук)
    prisma.event.create({
      data: {
        title: 'Летняя школа программирования',
        description: 'Интенсивный курс по современным технологиям разработки',
        startTime: new Date('2025-05-20T09:00:00Z'),
        endTime: new Date('2025-05-27T18:00:00Z'),
        location: 'IT-центр университета',
        category: { connect: { id: categories[0].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в научно-исследовательский институт',
        description: 'Знакомство с передовыми исследованиями и лабораториями',
        startTime: new Date('2025-05-22T10:00:00Z'),
        endTime: new Date('2025-05-25T16:00:00Z'),
        location: 'НИИ "Инновации"',
        category: { connect: { id: categories[1].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Студенческая олимпиада по программированию',
        description: 'Соревнования по алгоритмам и структурам данных',
        startTime: new Date('2025-05-23T09:00:00Z'),
        endTime: new Date('2025-05-26T18:00:00Z'),
        location: 'Компьютерный центр',
        category: { connect: { id: categories[2].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Карьерная неделя',
        description: 'Серия мероприятий по развитию карьеры и поиску работы',
        startTime: new Date('2025-05-21T10:00:00Z'),
        endTime: new Date('2025-05-27T17:00:00Z'),
        location: 'Студенческий центр',
        category: { connect: { id: categories[3].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Тренинг по лидерству',
        description: 'Развитие лидерских качеств и навыков управления командой',
        startTime: new Date('2025-05-22T14:00:00Z'),
        endTime: new Date('2025-05-25T18:00:00Z'),
        location: 'Аудитория 301',
        category: { connect: { id: categories[4].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Неделя студенческого самоуправления',
        description: 'Мероприятия по развитию студенческих инициатив',
        startTime: new Date('2025-05-20T09:00:00Z'),
        endTime: new Date('2025-05-27T20:00:00Z'),
        location: 'Студенческий центр',
        category: { connect: { id: categories[5].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Научная конференция молодых исследователей',
        description: 'Презентация научных работ студентов и аспирантов',
        startTime: new Date('2025-05-21T09:00:00Z'),
        endTime: new Date('2025-05-26T18:00:00Z'),
        location: 'Научная библиотека',
        category: { connect: { id: categories[6].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Спортивный фестиваль',
        description: 'Соревнования по различным видам спорта',
        startTime: new Date('2025-05-20T10:00:00Z'),
        endTime: new Date('2025-05-27T18:00:00Z'),
        location: 'Спортивный комплекс',
        category: { connect: { id: categories[7].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Воркшоп по машинному обучению',
        description: 'Практические занятия по ML и анализу данных',
        startTime: new Date('2025-05-22T13:00:00Z'),
        endTime: new Date('2025-05-25T17:00:00Z'),
        location: 'Лаборатория ИИ',
        category: { connect: { id: categories[0].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в инновационный центр',
        description: 'Знакомство с новейшими технологиями и разработками',
        startTime: new Date('2025-05-21T11:00:00Z'),
        endTime: new Date('2025-05-24T15:00:00Z'),
        location: 'Инновационный центр',
        category: { connect: { id: categories[1].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Хакатон по мобильной разработке',
        description: 'Создание мобильных приложений за 48 часов',
        startTime: new Date('2025-05-23T10:00:00Z'),
        endTime: new Date('2025-05-25T18:00:00Z'),
        location: 'IT-центр',
        category: { connect: { id: categories[2].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Семинар по карьерному росту',
        description: 'Стратегии развития карьеры в IT-индустрии',
        startTime: new Date('2025-05-22T15:00:00Z'),
        endTime: new Date('2025-05-24T18:00:00Z'),
        location: 'Конференц-зал',
        category: { connect: { id: categories[3].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Тренинг по soft skills',
        description: 'Развитие гибких навыков для успешной карьеры',
        startTime: new Date('2025-05-21T14:00:00Z'),
        endTime: new Date('2025-05-23T17:00:00Z'),
        location: 'Аудитория 205',
        category: { connect: { id: categories[4].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Фестиваль студенческих проектов',
        description: 'Презентация и защита студенческих работ',
        startTime: new Date('2025-05-20T13:00:00Z'),
        endTime: new Date('2025-05-26T20:00:00Z'),
        location: 'Студенческий центр',
        category: { connect: { id: categories[5].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Научный форум по искусственному интеллекту',
        description: 'Обсуждение последних достижений в области ИИ',
        startTime: new Date('2025-05-22T09:00:00Z'),
        endTime: new Date('2025-05-25T18:00:00Z'),
        location: 'Научный центр',
        category: { connect: { id: categories[6].id } },
      },
    }),

    // Предстоящие события (15 штук)
    prisma.event.create({
      data: {
        title: 'Международная конференция по веб-разработке',
        description: 'Конференция о современных технологиях веб-разработки',
        startTime: new Date('2025-05-28T09:00:00Z'),
        endTime: new Date('2025-05-30T18:00:00Z'),
        location: 'Главный корпус, Конференц-зал',
        category: { connect: { id: categories[0].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в IT-компанию',
        description: 'Знакомство с работой современной IT-компании',
        startTime: new Date('2025-05-29T10:00:00Z'),
        endTime: new Date('2025-05-29T16:00:00Z'),
        location: 'IT-компания "ТехноСофт"',
        category: { connect: { id: categories[1].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Чемпионат по алгоритмическому программированию',
        description: 'Соревнования по решению алгоритмических задач',
        startTime: new Date('2025-05-30T09:00:00Z'),
        endTime: new Date('2025-05-31T18:00:00Z'),
        location: 'Компьютерный центр',
        category: { connect: { id: categories[2].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Ярмарка вакансий для IT-специалистов',
        description: 'Встреча с работодателями из IT-индустрии',
        startTime: new Date('2025-05-31T10:00:00Z'),
        endTime: new Date('2025-05-31T17:00:00Z'),
        location: 'Студенческий центр',
        category: { connect: { id: categories[3].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Тренинг по DevOps практикам',
        description: 'Практическое знакомство с инструментами DevOps',
        startTime: new Date('2025-06-01T14:00:00Z'),
        endTime: new Date('2025-06-01T18:00:00Z'),
        location: 'Аудитория 301',
        category: { connect: { id: categories[4].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Выпускной вечер',
        description: 'Торжественное мероприятие для выпускников',
        startTime: new Date('2025-06-02T19:00:00Z'),
        endTime: new Date('2025-06-02T23:00:00Z'),
        location: 'Актовый зал',
        category: { connect: { id: categories[5].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Научный семинар по блокчейну',
        description: 'Обсуждение технологий блокчейна и криптовалют',
        startTime: new Date('2025-06-03T15:00:00Z'),
        endTime: new Date('2025-06-03T18:00:00Z'),
        location: 'Научная библиотека',
        category: { connect: { id: categories[6].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Турнир по баскетболу',
        description: 'Соревнования по баскетболу между факультетами',
        startTime: new Date('2025-06-04T10:00:00Z'),
        endTime: new Date('2025-06-04T18:00:00Z'),
        location: 'Спортивный зал',
        category: { connect: { id: categories[7].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Воркшоп по React Native',
        description: 'Практическое занятие по разработке мобильных приложений',
        startTime: new Date('2025-06-05T13:00:00Z'),
        endTime: new Date('2025-06-05T17:00:00Z'),
        location: 'IT-центр',
        category: { connect: { id: categories[0].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в дата-центр',
        description: 'Знакомство с инфраструктурой современного дата-центра',
        startTime: new Date('2025-06-06T11:00:00Z'),
        endTime: new Date('2025-06-06T15:00:00Z'),
        location: 'Дата-центр "ТехноСофт"',
        category: { connect: { id: categories[1].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Хакатон по искусственному интеллекту',
        description: 'Создание проектов с использованием ИИ за 48 часов',
        startTime: new Date('2025-06-07T10:00:00Z'),
        endTime: new Date('2025-06-09T18:00:00Z'),
        location: 'IT-центр',
        category: { connect: { id: categories[2].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Семинар по карьерному планированию',
        description: 'Стратегии построения успешной карьеры в IT',
        startTime: new Date('2025-06-08T15:00:00Z'),
        endTime: new Date('2025-06-08T18:00:00Z'),
        location: 'Конференц-зал',
        category: { connect: { id: categories[3].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Тренинг по управлению проектами',
        description: 'Практические техники управления IT-проектами',
        startTime: new Date('2025-06-09T14:00:00Z'),
        endTime: new Date('2025-06-09T17:00:00Z'),
        location: 'Аудитория 205',
        category: { connect: { id: categories[4].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Фестиваль инноваций',
        description: 'Презентация инновационных проектов студентов',
        startTime: new Date('2025-06-10T13:00:00Z'),
        endTime: new Date('2025-06-10T20:00:00Z'),
        location: 'Студенческий центр',
        category: { connect: { id: categories[5].id } },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Научный форум по квантовым вычислениям',
        description: 'Обсуждение перспектив квантовых технологий',
        startTime: new Date('2025-06-11T09:00:00Z'),
        endTime: new Date('2025-06-11T17:00:00Z'),
        location: 'Научный центр',
        category: { connect: { id: categories[6].id } },
      },
    }),
  ]);

  console.log('Created events:', events);

  const hashedPassword = await hash('student', {
    type: 2, // Argon2id
    memoryCost: 65536, // 64 MiB
    timeCost: 3, // 3 iterations
    parallelism: 4, // 4 threads
  });

  const student = await prisma.user.create({
    data: {
      name: 'Иван Иванов',
      login: 'student',
      password: hashedPassword,
      role: 'STUDENT',
      studentId: '2024-12345',
      email: 'student@example.com',
    },
  });

  console.log('Created student user:', student);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 