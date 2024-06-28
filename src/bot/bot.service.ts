import { Injectable, Logger } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(@InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>) {}

  async start(ctx: Context) {
    try {
      await ctx.reply(
        'Welcome! This is an echo bot. Send any message and I will echo it back to you.',
      );
    } catch (error) {
      this.logger.error('Error in start method:', error);
    }
  }

  async hi(ctx: Context) {
    try {
      if (ctx.message) {
        await ctx.reply('dd'); // Replace 'dd' with your desired reply message
      } else {
        throw new Error('Context or message text is undefined');
      }
    } catch (error) {
      this.logger.error('Error in hi method:', error);
    }
  }

  async sendMessageToChannel(channelId: string, message: string) {
    try {
      await this.bot.telegram.sendMessage(channelId, message);
      this.logger.log(`Message sent to channel ${channelId}: ${message}`);
    } catch (error) {
      this.logger.error(
        `Failed to send message to channel ${channelId}: ${error.response?.data}`,
      );
      throw error; // Propagate the error to handle it further if needed
    }
  }

  // You can add more service methods here as needed
}
