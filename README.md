# 🤖 SpiChatBoT-WA  

An **AI-powered WhatsApp ChatBot** built using **[whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)** and **OpenAI GPT-4**.  
It provides smart conversations, utility commands, and runs seamlessly with session persistence.  

---

## ✨ Features  

- 💬 **AI-powered chat responses** (powered by OpenAI GPT)  
- 📖 **Utility commands** (see Available Commands section below)
- 👋 Friendly greetings: `hi` / `hello`  
- 🔒 Persistent login with **LocalAuth** (no QR scan every time)  

---

## ⚙️ Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/elethiya/SpiChatBoT-WA.git
cd SpiChatBoT-WA
```

### 2. Install System Dependencies (Linux/Ubuntu)
```bash
sudo apt update && sudo apt install -y wget curl unzip xdg-utils libnss3 libxss1 libatk1.0-0 libcups2 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libgtk-3-0 libasound2 libasound2-plugins libpulse0 fonts-liberation
```

### 3. Install Node.js Dependencies
```bash
npm install
npm install whatsapp-web.js
npm install dotenv openai node-telegram-bot-api qrcode-terminal
```

### 4. Setup Environment Variables
Create a `.env` file in the root folder and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 📹 Video Tutorial: Getting OpenAI API Key
Watch this video tutorial to learn how to get your OpenAI API key:

[![How to get OpenAI API Key](https://img.youtube.com/vi/qtSBVSB1GU0/0.jpg)](https://youtu.be/qtSBVSB1GU0)

*Click the image above to watch the video tutorial on YouTube*

### 5. Run the Bot
**Development mode** (auto-restart with Nodemon):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```
---

## ✅ Notes:

- `npm start` → Runs the bot normally.
- `npm run dev` → Runs the bot with nodemon (auto restarts when you change code).

Make sure to install nodemon:
```bash
npm install --save-dev nodemon
```

### Installation Steps:
1. **Initialize Node project**:
   ```bash
   npm init -y
   ```

2. **Install WhatsApp Web.js (WhatsApp automation library)**:
   ```bash
   npm install whatsapp-web.js
   ```

3. **Install QR code terminal (to display QR for login)**:
   ```bash
   npm install qrcode-terminal
   ```

4. **Install OpenAI SDK (for AI responses)**:
   ```bash
   npm install openai
   ```

5. **Install dotenv (for managing environment variables)**:
   ```bash
   npm install dotenv
   ```

6. **(Optional) Install nodemon for auto-restart during development**:
   ```bash
   npm install -D nodemon
   ```

---

## 📦 Project Structure  

```
SpiChatBoT-WA/
│── bot.js                # Main bot script
│── package.json          # Dependencies & project info
│── package-lock.json     # Auto-generated lockfile
│── .env                  # API keys (not committed)
│── .gitignore            # Ignored files/folders
│── README.md             # Documentation
│── node_modules/         # Installed packages
│── .wwebjs_auth/         # WhatsApp auth session (ignored)
│── .wwebjs_cache/        # WhatsApp cache (ignored)
```
---

### 📖 Available Commands

- `!help`   - Show all available commands
- `!about`  - Show bot details and developer info
- `!time`   - Get current system time
- `!date`   - Get today's date
- `hi`/`hello` - Greet the bot
- `<any text>` - AI-generated reply using OpenAI GPT

### 🖼️ First-Time Setup

When you run the bot for the first time, a QR code will appear in your terminal.

📲 `Open WhatsApp` → `Menu` → `Linked Devices` → `Scan the QR`

Your session will be saved, so you don't need to scan again.

### 👨‍💻 Credits
Developer: **spi_enoxite**

Organization: **ELETHIYA**

Powered by: **OpenAI & whatsapp-web.js**

### 📜 License
This project is licensed under the MIT License – you're free to use, modify, and distribute it.

### 🚧 Error Handling
The bot handles errors gracefully, especially when interacting with the OpenAI API. If an error occurs, it will respond with a message indicating that it couldn't process the request.

### 🤝 Contributing
Contributions are welcome! Please feel free to submit issues or pull requests to improve the bot.
