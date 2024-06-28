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
        const channelId = '@channel_test_bots'; // Replace with your channel username or ID
        const message = ctx.message.text;

        // Log incoming message text
        console.log(`Received message: ${message}`);

        // Echo back a response
        await this.botService.hi(ctx);

        // Send the message to a channel
        await this.botService.sendMessageToChannel(channelId, message);
        console.log(`Message sent to channel ${channelId}: ${message}`);
      }
    } catch (error) {
      console.error(
        `Failed to process message update or send message to channel:`,
        error,
      );
    }
  }
}
