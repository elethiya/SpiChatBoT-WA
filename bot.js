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
`*📖 Available Commands:*  

➡️ *!about* – Shows bot details and developer info  
➡️ *!time* – Get the current system time  
➡️ *!date* – Get today’s date  
➡️ *!help* – Show all available commands  
➡️ *hi / hello* – Greet the bot  
➡️ (any other text) – AI will respond to you`;

    } else if (text === '!about') {
        replyText = 
`*🤖 About This Bot*  
_A ChatBoT by -_ *\`ELETHIYA\`*  
_Developer:_ *spi_enoxite*  
⚡ *Features:*  
• AI-powered replies  
• Utility commands (!time, !date, !help, !about)`;

    } else if (text === '!time') {
        replyText = `⏰ Current system time: *${new Date().toLocaleTimeString()}*`;

    } else if (text === '!date') {
        replyText = `📅 Today’s date is: *${new Date().toLocaleDateString()}*`;

    } else if (text === 'hi' || text === 'hello') {
        replyText = '👋 Hey there! I’m your friendly *SpiChatBoT*. Type *!help* to see what I can do.';

    } else {
        // ====== 📌 AI-generated response ======
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a friendly AI WhatsApp assistant." },
                    { role: "user", content: msg.body }
                ]
            });
            replyText = response.choices[0].message.content;
        } catch (error) {
            console.error('❌ OpenAI Error:', error);
            replyText = "⚠️ Sorry, I couldn’t process that.";
        }
    }

    // 📌 Add styled credits footer
    const credits = `\n\n_A ChatBoT by -_ *\`ELETHIYA\`* || _dev -_ *spi_enoxite*`;

    // Send reply with footer
    msg.reply(`${replyText}${credits}`);
});

// 🚀 Start the bot
client.initialize();