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
        const channelId = '@resume_templates_channel'; // Replace with your channel username or ID
        const message = ctx.message.text;

        // Send the message to a channel
        await this.botService.sendMessageToChannel(channelId, message);
        console.log(`Message sent to channel ${channelId}: ${message}`);

        // Reply to the user who sent the original message
        await ctx.reply('Successfully sent!');
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
