import { Start, Update, Ctx, On, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @Command('start')
  async handleStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    try {
      if (ctx.message && 'text' in ctx.message) {
        await this.botService.onMessage(ctx);
      }
    } catch (error) {
      console.error(
        `Failed to process message update or send message to channel:`,
        error,
      );
      await ctx.reply('Something is wrong!');
    }
  }
}
