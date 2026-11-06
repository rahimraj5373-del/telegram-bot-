const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');

const bot = new Telegraf('9033382266:AAGY_5InlAkfwh0Ql7v9CYN73Kn1EEzzcuk');

const USERS_FILE = 'users.json';

// Load existing users from file
let users = [];
if (fs.existsSync(USERS_FILE)) {
    try {
        users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (e) {
        users = [];
    }
}

function saveUsers() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

bot.start((ctx) => {
    const userId = ctx.from.id;
    
    // Add user if not already registered
    if (!users.includes(userId)) {
        users.push(userId);
        saveUsers();
    }

    const totalSubscribers = users.length;

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

// Broadcast Command: Type /broadcast <your message> in bot chat to send message to all users
bot.command('broadcast', async (ctx) => {
    // Only allow you (owner) or anyone testing to broadcast
    const message = ctx.message.text.replace('/broadcast', '').trim();
    if (!message) {
        return ctx.reply('⚠️ দয়া করে মেসেজ লিখুন। উদাহরণ:\n`/broadcast আপনার জরুরি ঘোষণা এখানে`', { parse_mode: 'Markdown' });
    }

    await ctx.reply(`📤 Broadcasting to ${users.length} users... Please wait.`);

    let successCount = 0;
    let failCount = 0;

    for (let userId of users) {
        try {
            await bot.telegram.sendMessage(userId, message, { parse_mode: 'Markdown' });
            successCount++;
            // Small delay to avoid Telegram rate limits
            await new Promise(resolve => setTimeout(resolve, 50));
        } catch (err) {
            failCount++;
        }
    }

    return ctx.reply(`✅ Broadcast Complete!\n\nSuccessful: ${successCount}\nFailed: ${failCount}`);
});

bot.command('stats', (ctx) => {
    return ctx.reply(`📊 *Bot Statistics*\n\n👥 Total Users Started: *${users.length}*`, { parse_mode: 'Markdown' });
});

bot.launch();
console.log('🤖 Tanjirul Mine Bot is running successfully with persistent user storage!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
          
