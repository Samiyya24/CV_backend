import { Injectable } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';

@Injectable()
export class BotService {
  constructor(@InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>) {}

  async start(ctx: Context) {
    await ctx.reply(
      'Welcome! This is an echo bot. Send any message and I will echo it back to you.',
    );
  }

  async hi(ctx: Context) {
    if (ctx && ctx.message) {
      await ctx.reply('dd');
      console.log(ctx.);
    } else {
      console.error('Context or message text is undefined');
    }
      
  }

  async sendMessageToChannel(channelId: string, message: string) {
    try {
      await this.bot.telegram.sendMessage(channelId, message);
      console.log(`Message sent to channel ${channelId}: ${message}`);
    } catch (error) {
      console.error(
        `Failed to send message to channel service ${channelId}:`,
        error.response?.data,
      );
      throw error; // Propagate the error to handle it further if needed
    }
  }

  // You can add more service methods here as needed
}
