import os
import telebot
import google.generativeai as genai

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

if not TELEGRAM_TOKEN or not GOOGLE_API_KEY:
    raise ValueError("TELEGRAM_BOT_TOKEN এবং GOOGLE_API_KEY সেট করা নেই!")

genai.configure(api_key=GOOGLE_API_KEY)

system_instruction = (
    "You are a helpful AI assistant on Telegram. "
    "Your owner and creator is MD. TANJIRUL KING. "
    "If anyone asks who made you, who is your owner, or asks about your creator, reply with MD. TANJIRUL KING. "
    "Seamlessly understand and respond in Bangla, English, or Banglish based on the user's input language."
)

generation_config = {"temperature": 0.7}
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=system_instruction,
    generation_config=generation_config
)

bot = telebot.TeleBot(TELEGRAM_TOKEN)
user_chats = {}

@bot.message_handler(commands=['start'])
def send_welcome(message):
    user_name = message.from_user.first_name
    welcome_text = (
        f"👋 স্বাগতম, {user_name}!\n\n"
        "🤖 আমি আপনার পার্সোনাল এআই অ্যাসিস্ট্যান্ট। আপনি আমাকে যেকোনো প্রশ্ন করতে পারেন।\n\n"
        "আগের কথোপকথন মুছে ফেলতে /reset লিখুন।"
    )
    bot.reply_to(message, welcome_text)

@bot.message_handler(commands=['reset'])
def reset_chat(message):
    user_id = message.from_user.id
    if user_id in user_chats:
        del user_chats[user_id]
    bot.reply_to(message, "এই চ্যাটের আগের কথোপকথন মুছে ফেলা হয়েছে।")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    user_id = message.from_user.id
    user_text = message.text

    try:
        if user_id not in user_chats:
            user_chats[user_id] = model.start_chat(history=[])
        
        chat = user_chats[user_id]
        response = chat.send_message(user_text)
        bot.reply_to(message, response.text)
    except Exception as e:
        bot.reply_to(message, "দুঃখিত, একটি সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।")

if __name__ == "__main__":
    print("Bot is running...")
    bot.infinity_polling()
  
