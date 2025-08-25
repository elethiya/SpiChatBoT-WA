# 🤖 SpiChatBoT-WA  

An **AI-powered WhatsApp ChatBot** built using **[whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)** and **OpenAI GPT-4**.  
It provides smart conversations, utility commands, and runs seamlessly with session persistence.  

---

## ✨ Features  

- 💬 **AI-powered chat responses** (powered by OpenAI GPT)  
- 📖 **Utility commands**:
  - `!help` – Show available commands  
  - `!about` – Bot and developer info  
  - `!time` – Get current system time  
  - `!date` – Get today’s date  
- 👋 Friendly greetings: `hi` / `hello`  
- 🔒 Persistent login with **LocalAuth** (no QR scan every time)  

---

## 📦 Project Structure  

SpiChatBoT-WA/
│── bot.js # Main bot script
│── package.json # Dependencies & project info
│── package-lock.json # Auto-generated lockfile
│── .env # API keys (not committed)
│── .gitignore # Ignored files/folders
│── README.md # Documentation
│── node_modules/ # Installed packages
│── .wwebjs_auth/ # WhatsApp auth session (ignored)
│── .wwebjs_cache/ # WhatsApp cache (ignored)


---

## ⚙️ Setup  

### 1. Clone the Repository  
```
git clone https://github.com/elethiya/SpiChatBoT-WA.git
```
```
cd SpiChatBoT-WA
````

2. Install Dependencies
```
npm install
```

3. Setup Environment Variables
Create a .env file in the root folder and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the Bot
Development mode (auto-restart with Nodemon):
```
npm run dev
```

Production mode:
```
npm start
```

📖 Available Commands

`!help`   - Show all available commands
`!about`  - Show bot details and developer info
`!time`   - Get current system time
`!date`   - Get today’s date
`hi`/`hello` - Greet the bot
<any text> - AI-generated reply using OpenAI GPT

🖼️ First-Time Setup

When you run the bot for the first time, a QR code will appear in your terminal.
📲 `Open WhatsApp` → `Menu` → `Linked Devices` → `Scan the QR`
Your session will be saved, so you don’t need to scan again.

👨‍💻 Credits
Developer: spi_enoxite

Organization: ELETHIYA

Powered by: OpenAI & whatsapp-web.js

📜 License
This project is licensed under the MIT License – you’re free to use, modify, and distribute it.
