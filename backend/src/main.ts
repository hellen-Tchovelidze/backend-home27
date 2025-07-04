import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);

  app.enableCors({
    origin: process.env.FRONT_URL,  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

}
bootstrap();
