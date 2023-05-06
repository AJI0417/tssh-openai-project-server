const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://tssh-open-ai-project.vercel.app",
  })
);

app.post("/", async (req, res) => {
  const { question } = req.body;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
    max_tokens: 300,
  });
  const answer = completion.data.choices[0].message;
  res.json({ question, answer });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
