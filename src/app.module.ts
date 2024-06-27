import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/entities/admin.entity';
import { AdminModule } from './admin/admin.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { BOT_NAME } from './app.constants';
import { Bot } from './bot/model/bot.model';
import { ResumeModule } from './resume/resume.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Resume } from './resume/entities/resume.entity';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      synchronize: true,
      entities: [Bot, Admin, User, Resume],
    }),
    UsersModule,
    BotModule,
    AdminModule,
    ResumeModule,
  ],
  controllers: [],
  providers: [],
  // exports: ['TelegrafBot'],
})
export class AppModule {}
