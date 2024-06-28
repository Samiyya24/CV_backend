import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT') || 3000;

    app.setGlobalPrefix('api');
    // Define the Swagger document options
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    
    // Create the Swagger document
    const document = SwaggerModule.createDocument(app, config);
    
    // Setup Swagger UI with the correct URL path
    SwaggerModule.setup('api/docs', app, document);

    // Set global prefix for the application
    
    // Start listening to the specified PORT
    await app.listen(PORT, () => {
      console.log(`Server started at | http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();

