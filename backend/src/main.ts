import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем валидацию
  app.useGlobalPipes(new ValidationPipe());
  
  // Настраиваем CORS
  app.enableCors();
  
  // Настраиваем Swagger
  const config = new DocumentBuilder()
    .setTitle('Campus Events API')
    .setDescription('API для управления мероприятиями кампуса')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
