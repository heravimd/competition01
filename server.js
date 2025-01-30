const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const BOT_TOKEN = '7847129168:AAHPcutCi4Eqr98qyDgiNQkIGMAb_6y_0j0'; // Replace with your bot token

app.use(express.json());

// Set up a webhook to receive updates from Telegram
app.post('/webhook', async (req, res) => {
  const { message } = req.body;
  const chatId = message.chat.id;
  const text = message.text;

  if (text === '/start') {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: 'Welcome to the app! Click the button below to play.',
      reply_markup: {
        inline_keyboard: [[{ text: 'Play', web_app: { url: 'https://competition01.vercel.app/' } }]],
      },
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});