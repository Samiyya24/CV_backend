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
    if ('text' in ctx.message) {
      const channelId = 't.me/channel_test_bots'; // Replace with your channel username or ID
      const message = ctx.message.text;

      try {
        await this.botService.sendMessageToChannel(channelId, message);
        console.log(`Message sent to channel ${channelId}: ${message}`);
      } catch (error) {
        console.error(
          `Failed to send message to channel ${channelId}:`,
          error.response?.data,
        );
      }
    }
  }
}
