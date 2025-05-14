import { PrismaClient, CategoryType } from '@prisma/client';

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
        imageUrl: 'https://example.com/conferences.jpg',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Экскурсии' },
      update: {},
      create: {
        name: 'Экскурсии',
        type: CategoryType.EXCURSIONS,
        imageUrl: 'https://example.com/excursions.jpg',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Спорт' },
      update: {},
      create: {
        name: 'Спорт',
        type: CategoryType.SPORTS,
        imageUrl: 'https://example.com/sports.jpg',
      },
    }),
  ]);

  // Создаем события
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Международная конференция по ИИ',
        description: 'Ежегодная конференция, посвященная последним достижениям в области искусственного интеллекта',
        startTime: new Date('2024-04-15T10:00:00Z'),
        endTime: new Date('2024-04-16T18:00:00Z'),
        location: 'Главный корпус, аудитория 101',
        categoryId: categories[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в Технопарк',
        description: 'Знакомство с инновационными проектами и стартапами',
        startTime: new Date('2024-04-20T14:00:00Z'),
        endTime: new Date('2024-04-20T17:00:00Z'),
        location: 'Технопарк "Инновации"',
        categoryId: categories[1].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Турнир по волейболу',
        description: 'Ежегодный турнир между факультетами',
        startTime: new Date('2024-04-25T15:00:00Z'),
        endTime: new Date('2024-04-25T19:00:00Z'),
        location: 'Спортивный комплекс',
        categoryId: categories[2].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Хакатон по веб-разработке',
        description: '48-часовой марафон по созданию веб-приложений',
        startTime: new Date('2024-05-01T10:00:00Z'),
        endTime: new Date('2024-05-03T18:00:00Z'),
        location: 'IT-центр, зал инноваций',
        categoryId: categories[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в научную библиотеку',
        description: 'Знакомство с редкими изданиями и историей библиотеки',
        startTime: new Date('2024-05-05T11:00:00Z'),
        endTime: new Date('2024-05-05T13:00:00Z'),
        location: 'Главная библиотека, читальный зал',
        categoryId: categories[1].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Турнир по шахматам',
        description: 'Ежегодный турнир по шахматам среди студентов',
        startTime: new Date('2024-05-10T12:00:00Z'),
        endTime: new Date('2024-05-10T18:00:00Z'),
        location: 'Клуб "Интеллект"',
        categoryId: categories[2].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Воркшоп по UI/UX дизайну',
        description: 'Практический семинар по созданию пользовательских интерфейсов',
        startTime: new Date('2024-05-15T14:00:00Z'),
        endTime: new Date('2024-05-15T18:00:00Z'),
        location: 'Дизайн-студия, корпус Б',
        categoryId: categories[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Экскурсия в музей университета',
        description: 'Знакомство с историей университета и его выдающимися выпускниками',
        startTime: new Date('2024-05-20T10:00:00Z'),
        endTime: new Date('2024-05-20T12:00:00Z'),
        location: 'Музей университета',
        categoryId: categories[1].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Турнир по настольному теннису',
        description: 'Соревнования по настольному теннису среди студентов',
        startTime: new Date('2024-05-25T15:00:00Z'),
        endTime: new Date('2024-05-25T19:00:00Z'),
        location: 'Спортивный зал №2',
        categoryId: categories[2].id,
      },
    }),
  ]);

  console.log('Created categories:', categories);
  console.log('Created events:', events);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 