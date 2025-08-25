// bot.js
require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const OpenAI = require('openai');


// 🔑 Setup OpenAI (use your API key from environment variable)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ✅ Use LocalAuth to save session automatically (no QR scan every restart)
const client = new Client({
  authStrategy: new LocalAuth({ clientId: "elethiya-bot" }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // 👈 sometimes helps in Linux
      '--disable-gpu'
    ]
  }
});


// 📌 QR Code Login (only first time)
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('📲 Scan this QR code with your WhatsApp (only once).');
});

// 📌 When Bot is Ready
client.on('ready', () => {
    console.log('✅ WhatsApp bot with AI is ready!');
});

// 📌 Handle Incoming Messages
client.on('message', async msg => {
    console.log(`📩 Message from ${msg.from}: ${msg.body}`);

    let replyText = '';
    const text = msg.body.toLowerCase().trim();

    // ====== 📌 Commands ======
    if (text === '!help') {
        replyText = 
`🌟 *📖 AVAILABLE COMMANDS* 🌟

✨ *!about* – Shows bot details and developer info  
⏰ *!time* – Get the current system time  
📅 *!date* – Get today's date  
❓ *!help* – Show all available commands  
👋 *hi / hello* – Greet the bot  
🤖 *(any other text)* – AI will respond to you

💡 *Tip:* Just type anything to chat with me!`;

    } else if (text === '!about') {
        replyText = 
`🤖 *✨ ABOUT SPI CHAT BOT ✨*  

_Developed by:_ *\`ELETHIYA\`* 🚀  
_Creator:_ *spi_enoxite* 👨‍💻  

⚡ *🌟 FEATURES:*  
• 🤖 AI-powered intelligent responses  
• ⚡ Quick utility commands  
• 🔄 Persistent session with LocalAuth  
• 💬 Natural conversation flow  

🌐 *Powered by:* OpenAI GPT & whatsapp-web.js`;

    } else if (text === '!time') {
        replyText = `🕰️ *Current System Time:* \n⏰ *${new Date().toLocaleTimeString()}*`;

    } else if (text === '!date') {
        replyText = `📆 *Today's Date:* \n📅 *${new Date().toLocaleDateString()}*`;

    } else if (text === 'hi' || text === 'hello') {
        replyText = '👋 *Hello there!* 🤗\nI\'m your friendly *SpiChatBoT*! 💫\n\nType *!help* to see what I can do! ✨';

    } else {
        // ====== 📌 AI-generated response ======
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a friendly AI WhatsApp assistant. Use emojis and friendly language. Keep responses engaging and helpful." },
                    { role: "user", content: msg.body }
                ]
            });
            replyText = response.choices[0].message.content;
        } catch (error) {
            console.error('❌ OpenAI Error:', error);
            replyText = "⚠️ *Oops!* 😅\nI couldn't process that request right now. Please try again later!";
        }
    }

    // 📌 Add styled credits footer
    const credits = `\n\n _A ChatBoT by:_ *\`ELETHIYA\`*  ||  _dev:_ *spi_enoxite* `;

    // Send reply with footer
    msg.reply(`${replyText}${credits}`);
});

// 🚀 Start the bot
client.initialize();
