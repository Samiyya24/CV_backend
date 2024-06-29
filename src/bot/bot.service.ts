import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  private step: any;
  private user: any;

  constructor(@InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>) {
    this.step = 0;
    this.user = {};
  }

  async start(ctx: Context) {
    this.step = 0;
    this.user = {};
    await ctx.reply(
      'Welcome! To create a resume, press the "Start Resume" button.',
      {
        reply_markup: {
          keyboard: [[{ text: 'Start Resume' }, { text: 'About us' }]],
          resize_keyboard: true,
        },
      },
    );
  }

  async onMessage(ctx: Context) {
    if ('text' in ctx.message) {
      const ret = 'return back';

      const returnBack = async (ctx: Context, user: any, step: any) => {
        await ctx.reply(
          `Resume Details:\n
Name: ${user.name || 'empty'}
Age: ${user.age || 'empty'}
Email: ${user.email || 'empty'}
Phone: ${user.phone || 'empty'}
Education: ${user.education || 'empty'}
Experience: ${user.experience || 'empty'}`,
          {
            reply_markup: {
              keyboard: [[{ text: 'Start Resume' }, { text: 'About us' }]],
              resize_keyboard: true,
            },
          },
        );
      };

      if (ctx.message.text == 'About us') {
        await ctx.reply('This bot helps you create a resume step-by-step.');
      } else if (ctx.message.text == 'Start Resume') {
        this.user.id = ctx.message.from.id;
        this.step = 1;
        await ctx.reply('Enter your name:', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step = --this.step;
        await returnBack(ctx, this.user, this.step);
      } else if (this.step == 1 && this.user.id == ctx.message.from.id) {
        this.user.name = ctx.message.text;
        this.step++;
        await ctx.reply('Enter your age:', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (this.step == 2 && this.user.id == ctx.message.from.id) {
        this.user.age = ctx.message.text;
        this.step++;
        await ctx.reply('Enter your email:', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (this.step == 3 && this.user.id == ctx.message.from.id) {
        this.user.email = ctx.message.text;
        this.step++;
        await ctx.reply('Enter your phone number:', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (this.step == 4 && this.user.id == ctx.message.from.id) {
        this.user.phone = ctx.message.text;
        this.step++;
        await ctx.reply('Enter your education details:', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (this.step == 5 && this.user.id == ctx.message.from.id) {
        this.user.education = ctx.message.text;
        this.step++;
        await ctx.reply('Enter your experience details:', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (this.step == 6 && this.user.id == ctx.message.from.id) {
        this.user.experience = ctx.message.text;
        this.step = 0;
        await ctx.reply('Your resume has been created successfully!', {
          reply_markup: {
            keyboard: [[{ text: 'Start Resume' }, { text: 'About us' }]],
            resize_keyboard: true,
          },
        });

        const channelId = '@resume_templates_channel'; // Replace with your channel username or ID
        const message = `
📄 New Resume Created! 🎉

Name: ${this.user.name}
Age: ${this.user.age}
Email: ${this.user.email}
Phone: ${this.user.phone}
Education: ${this.user.education}
Experience: ${this.user.experience}

🎊 Your new resume is ready! 🎊
`;

        await this.sendMessageToChannel(channelId, message);

        // Reply to the user who sent the original message
        await ctx.replyWithMarkdown(`
✅ **Your resume has been created successfully!**

You can view your resume and more templates on our [resume templates channel](https://t.me/resume_templates_channel).

*Thank you for using our service!* 🌟
`);
      }
    }
  }

  async sendMessageToChannel(channelId: string, message: string) {
    try {
      await this.bot.telegram.sendMessage(channelId, message);
    } catch (error) {
      console.error(`Failed to send message to channel ${channelId}:`, error);
    }
  }
}
