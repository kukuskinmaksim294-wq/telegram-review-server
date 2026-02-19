import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // для JSON POST-запросов

// Маршрут для получения отзывов с формы
app.post("/send", async (req, res) => {
  const { name, review, rating } = req.body; // rating можно добавить, если используешь звёзды
  const text = `📩 Отзыв:\nИмя: ${name}\n${rating ? `Оценка: ${rating}\n` : ""}Отзыв: ${review}`;

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка при отправке в Telegram");
  }
});

// Слушаем порт, который даёт Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
