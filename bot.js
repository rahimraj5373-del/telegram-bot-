const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('9033382266:AAGY_5InlAkfwh0Ql7v9CYN73Kn1EEzzcuk');

let usersList = new Set();

bot.start((ctx) => {
    const userId = ctx.from.id;
    usersList.add(userId);

    const welcomeMessage = `⚡ *Welcome to Tanjirul Pay & Mine!*\n\n` +
        `🚀 Mine TPZ tokens, complete daily tasks, build your 7-day streaks, and invite friends to earn more!\n\n` +
        `👇 Click the button below to launch the app:`;

    return ctx.reply(welcomeMessage, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Open Mining App', 'https://rahimraj5373-del.github.io/tanjirul-app/')],
            [Markup.button.url('📢 Join Community', 'https://t.me/tanjirul0123'), Markup.button.url('🌐 Twitter (X)', 'https://x.com/tanjirul_king')]
        ])
    });
});

bot.command('broadcast', async (ctx) => {
    const messageText = ctx.message.text.replace('/broadcast', '').trim();

    if (!messageText) {
        return ctx.reply('⚠️ Please provide a message to broadcast. Example: /broadcast Hello everyone!');
    }

    ctx.reply(`📢 Broadcasting message to ${usersList.size} users...`);

    for (let userId of usersList) {
        try {
            await bot.telegram.sendMessage(userId, `📢 *Announcement:*\n\n${messageText}`, { parse_mode: 'Markdown' });
        } catch (e) {
            console.log(`Failed to send to ${userId}:`, e.message);
        }
    }

    ctx.reply('✅ Broadcast completed successfully!');
});

bot.launch();
console.log('🤖 Tanjirul Mine Bot is running successfully!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
          
