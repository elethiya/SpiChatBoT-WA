// bot.js - Enhanced with robust session persistence
require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// 🔑 Setup OpenAI (use your API key from environment variable)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// 📌 Session Management Functions
function checkExistingSession() {
    const authDir = path.join(__dirname, '.wwebjs_auth');
    try {
        if (fs.existsSync(authDir)) {
            const files = fs.readdirSync(authDir);
            const sessionFiles = files.filter(file => file.endsWith('.json'));
            return sessionFiles.length > 0;
        }
    } catch (error) {
        console.error('❌ Error checking existing session:', error.message);
    }
    return false;
}

function cleanupOldSessions() {
    const sessionsDir = path.join(__dirname, 'sessions');
    try {
        if (fs.existsSync(sessionsDir)) {
            const sessionDirs = fs.readdirSync(sessionsDir);
            sessionDirs.forEach(dir => {
                if (dir !== 'session-elethiya-bot') {
                    const dirPath = path.join(sessionsDir, dir);
                    fs.rmSync(dirPath, { recursive: true, force: true });
                    console.log(`🧹 Cleaned up old session: ${dir}`);
                }
            });
        }
    } catch (error) {
        console.error('❌ Error cleaning up old sessions:', error.message);
    }
}

// 🧹 Clean up old sessions before starting
cleanupOldSessions();

// ✅ Use LocalAuth to save session automatically
const client = new Client({
    authStrategy: new LocalAuth({ 
        clientId: "elethiya-bot",
        dataPath: "./.wwebjs_auth"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--user-data-dir=./sessions/session-elethiya-bot'
        ]
    }
});

// 📌 Check if session already exists
const hasExistingSession = checkExistingSession();
if (hasExistingSession) {
    console.log('✅ Found existing session. Will attempt to restore...');
} else {
    console.log('🔍 No existing session found. Will require QR code scan.');
}

// 📌 Authentication Events with Enhanced Logging
client.on('qr', qr => {
    console.log('🔐 QR Code Generated:');
    qrcode.generate(qr, { small: true });
    console.log('📲 Scan this QR code with your WhatsApp to authenticate.');
    console.log('💡 This should only be required once!');
});

client.on('authenticated', () => {
    console.log('✅ Authentication successful! Session saved.');
    console.log('🔒 You should not need to scan QR code again on next restart.');
});

client.on('auth_failure', msg => {
    console.error('❌ Authentication failed:', msg);
    console.log('🔄 Please restart the bot and scan QR code again.');
});

client.on('ready', () => {
    console.log('🎉 WhatsApp bot with AI is ready and authenticated!');
    console.log('🤖 Bot is now listening for messages...');
});

client.on('disconnected', (reason) => {
    console.log('🔌 Client was logged out:', reason);
    console.log('🔄 Restarting bot in 5 seconds...');
    setTimeout(() => {
        client.initialize();
    }, 5000);
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

🌐 *Powered by:* OpenAI & whatsapp-web.js`;

    } else if (text === '!time') {
        replyText = `🕰️ *Current System Time:* \n⏰ *${new Date().toLocaleTimeString()}*`;

    } else if (text === '!date') {
        replyText = `📆 *Today's Date:* \n📅 *${new Date().toLocaleDateString()}*`;

    } else if (text === 'hi' || text === 'hello') {
        replyText = '👋 *Hello there!* 🤗\nI\'m your friendly *SpiChatBoT*! 💫\n\nType *!help* to see what I can do! ✨';

    } else if (text === '!session') {
        replyText = `🔐 *Session Status:* ${hasExistingSession ? '✅ Persistent session active' : '🔄 Requires authentication'}`;

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

// 📌 Graceful shutdown handling
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    console.log('💾 Ensuring session is properly saved...');
    try {
        await client.destroy();
        console.log('✅ Session saved successfully.');
    } catch (error) {
        console.error('❌ Error during shutdown:', error);
    }
    process.exit(0);
});

// 🚀 Start the bot with enhanced error handling
console.log('🚀 Starting WhatsApp bot with persistent session...');
console.log('📁 Session will be saved in: .wwebjs_auth/');

client.initialize().catch(error => {
    console.error('❌ Failed to initialize bot:', error);
    console.log('🔄 Restarting in 10 seconds...');
    setTimeout(() => {
        client.initialize();
    }, 10000);
});
