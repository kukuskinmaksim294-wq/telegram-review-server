import express from "express";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/send", async (req, res) => {
  const { name, review } = req.body;
  const text = `📩 Отзыв:\nИмя: ${name}\nОтзыв: ${review}`;

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);

  res.send("OK");
});

app.listen(process.env.PORT || 3000);
