import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT') || 3000;

    app.setGlobalPrefix('api');
    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();
