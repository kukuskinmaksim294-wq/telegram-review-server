// index.js
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // для JSON POST-запросов

app.post("/send", async (req, res) => {
  const { name, review } = req.body;
  const text = `📩 Отзыв:\nИмя: ${name}\nОтзыв: ${review}`;

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
