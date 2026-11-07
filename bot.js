const TelegramBot = require('node-telegram-bot-api');

// বটের টোকেন
const token = process.env.BOT_TOKEN || '9033382266:AAFR_m7qYCBM5JWDdACVrbMm1emgvC-Jn00';
const bot = new TelegramBot(token, { polling: true });

// আপনার গিটহাব মিনি অ্যাপের লাইভ লিংক এখানে দিন (যেমন: https://your-username.github.io/your-repo-name/)
const WEB_APP_URL = "https://your-username.github.io/your-repo-name/"; 
const CHANNEL_URL = "https://t.me/tanjirul0123";
const TWITTER_URL = "https://x.com/tanjirul_king";

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || "User";

    const welcomeText = (
        `⚡ *Welcome to Tanjirul Pay & Mine!*\n\n` +
        `Hello *${firstName}*! Let's start mining digital assets.\n\n` +
        `🟢 Tap Start Mining below\n` +
        `📋 Complete tasks to earn bonus\n` +
        `👥 Invite friends and earn TPZ\n` +
        `🎁 Daily streak rewards available!`
    );

    const opts = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🚀 Open Mining App",
                        web_app: { url: WEB_APP_URL }
                    }
                ],
                [
                    { text: "📢 Join Community", url: CHANNEL_URL },
                    { text: "🌐 Twitter (X)", url: TWITTER_URL }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeText, opts);
});

console.log("Node.js Bot is running successfully...");
