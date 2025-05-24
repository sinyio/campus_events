-- Обновляем статусы событий
UPDATE events 
SET status = 'ONGOING' 
WHERE id IN (
  'cmak8is3s0007u5xc08wgzdi4',  -- Конференция по ИИ
  'cmak8is3s0008u5xcbeozm2nj'   -- Экскурсия в Технопарк
);

UPDATE events 
SET status = 'PAST' 
WHERE id IN (
  'cmak8is3s0006u5xc86r7rn8r',  -- Турнир по волейболу
  'cmak8is5q000gu5xckpgnq2y2'   -- Хакатон по веб-разработке
); 