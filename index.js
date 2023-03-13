import express from 'express';
import { ChatGPTAPI } from 'chatgpt';
import login from 'fca-unofficial';
import key from "./utils/keys.js";

import dotenv from 'dotenv';
const app = express();
dotenv.config();

async function chatgpt(body, key) {
  const api = new ChatGPTAPI({
    apiKey: key
  })

  const res = await api.sendMessage(body);
  return res.text
}

login({ appState: JSON.parse(process.env.FB_STATE) }, (err, api) => {
  if (err) return console.error(err);

  api.listen(async (err, message) => {
    if (err) throw err;

    if (message.type === 'message') {
      const apiKey = await key();
      if(!apiKey) {
        return api.sendMessage("Salik Yawa kay naay error", message.threadID);
      }
      
      let body = message.body;
      const isMentioned = message?.mentions['100090210600341'] === '@Xyst Lee';
      if (body.startsWith("@Xyst Lee") && isMentioned) {
        body = body.replace("@Xyst Lee", "").trim();
        const reply = await chatgpt(body, apiKey);
        api.sendMessage({ body: reply }, message.threadID);
      }
      if (message.senderID === "100030415156660" && !message.isGroup) {
        const reply = await chatgpt(body, apiKey);
        api.sendMessage({ body: reply }, message.threadID);
      }
    }
  });
});

app.get('/', (req, res) => {
  res.send("Goods");
});
app.listen(3000, () => {
  console.log("Running on port 3000...");
});
console.log("Hehe");
