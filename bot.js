const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('9033382266:AAGY_5InlAkfwh0Ql7v9CYN73Kn1EEzzcuk');

let usersList = new Set();

bot.start((ctx) => {
    const userId = ctx.from.id;
    usersList.add(userId);

    const totalSubscribers = usersList.size;

    const welcomeMessage = `⚡ *Welcome to Tanjirul Pay & Mine!*\n\n` +
        `👥 Total Active Miners: *${totalSubscribers}*\n\n` +
        `🚀 Mine TPZ tokens, complete daily tasks, build your 7-day streaks, and invite friends to earn more for upcoming listing!\n\n` +
        `👇 Click the button below to launch the app:`;

    return ctx.reply(welcomeMessage, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Open Mining App', 'https://rahimraj5373-del.github.io/tanjirul-app/')],
            [Markup.button.url('📢 Join Community', 'https://t.me/tanjirul0123'), Markup.button.url('🌐 Twitter (X)', 'https://x.com/tanjirul_king')]
        ])
    });
});

bot.command('stats', (ctx) => {
    return ctx.reply(`📊 *Bot Statistics:*\n\n👥 Total Users Started: *${usersList.size}*`, { parse_mode: 'Markdown' });
});

bot.launch();
console.log('🤖 Tanjirul Mine Bot is running successfully with user tracking!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
