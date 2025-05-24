import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Обновляем статусы на ONGOING
  await prisma.event.updateMany({
    where: {
      id: {
        in: [
          'cmak8is3s0007u5xc08wgzdi4',  // Конференция по ИИ
          'cmak8is3s0008u5xcbeozm2nj'   // Экскурсия в Технопарк
        ]
      }
    },
    data: {
      status: 'ONGOING'
    }
  });

  // Обновляем статусы на PAST
  await prisma.event.updateMany({
    where: {
      id: {
        in: [
          'cmak8is3s0006u5xc86r7rn8r',  // Турнир по волейболу
          'cmak8is5q000gu5xckpgnq2y2'   // Хакатон по веб-разработке
        ]
      }
    },
    data: {
      status: 'PAST'
    }
  });

  console.log('Event statuses updated successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 