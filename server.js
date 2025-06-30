// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // if using Node 18+ this is native

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/ask-gemini", async (req, res) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Error calling Gemini API" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
