import { forwardRef, Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from './model/bot.model';

@Module({
  imports: [TypeOrmModule.forFeature([Bot])],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
