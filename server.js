import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(client) });
});

app.post("/api/improve", async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({
        error: "OpenAI API key is missing. Add OPENAI_API_KEY to your .env file and restart the server."
      });
    }
    const prompt = req.body?.prompt;
    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Please provide a prompt." });
    }
    if (prompt.length > 6000) {
      return res.status(400).json({ error: "Prompt is too long. Keep it under 6,000 characters." });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: [
        "You are PromptLab, an expert prompt engineer and helpful writing coach.",
        "Turn the user's rough idea and requirements into one polished, ready-to-use AI prompt.",
        "Include a suitable role, clear task, relevant context, audience, constraints, and requested output format.",
        "Preserve the user's intent. Do not answer the prompt; write the improved prompt itself.",
        "Use clear headings and concise, practical instructions. Do not invent missing facts."
      ].join(" "),
      input: prompt
    });

    const improved = response.output_text?.trim();
    if (!improved) {
      return res.status(502).json({ error: "The AI returned an empty response. Please try again." });
    }
    res.json({ improved });
  } catch (error) {
    console.error("PromptLab API error:", error?.message || error);
    res.status(error?.status === 401 ? 502 : 500).json({
      error: error?.status === 401
        ? "The API key was rejected. Check OPENAI_API_KEY in .env."
        : "AI request failed. Check API billing, network, and server terminal, then try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`PromptLab is running at http://localhost:${PORT}`);
  if (!client) console.log("Add OPENAI_API_KEY to .env to enable AI prompt improvement.");
});
