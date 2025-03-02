const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(require("cors")());

app.post("/translate", async (req, res) => {
  const { text, source, target } = req.body;

  if (!text || !source || !target) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({ q: text, source, target, format: "text" }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.json({ translatedText: data.translatedText });
    console.log(translatedText);
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
