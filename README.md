# PromptLab — AI Prompt Engineering Studio

Responsive prompt-engineering website using HTML, CSS and JavaScript, with a Node.js/Express backend for secure OpenAI API calls.

## Requirements
- Node.js 18+ (current LTS recommended)
- An OpenAI API key with API billing/usage enabled

## Setup
1. Extract this ZIP and open the `PromptLab_Project` folder in VS Code.
2. Open the terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Put your own secret key after `OPENAI_API_KEY=` in `.env`.
6. Run `npm start`.
7. Visit http://localhost:3000

Do not open `public/index.html` directly or use Live Server for this API version. Open the page through the Node server.

## API key safety
- Keep the real key only in `.env`.
- Never put the key in HTML, frontend JavaScript, screenshots, or GitHub.
- `.env` is excluded by `.gitignore`.
- API usage may cost money separately from a ChatGPT subscription. Check API billing and usage limits.

## Included
- Dashboard and prompt formula
- AI-powered Prompt Studio via OpenAI Responses API
- Starter prompt library and locally saved prompts
- Before/after prompt comparison
- Learning cards and quiz
- Local prompt history
- Responsive dark futuristic design

Saved prompts and history use browser localStorage on that browser/device. No user login or cloud database is included.

## Troubleshooting
- Missing key: check `.env` filename and restart the server.
- Key rejected: replace it with a valid API key.
- Quota/billing issue: check API billing and usage limits.
- Port busy: set `PORT=3001` in `.env` and open http://localhost:3001.

API docs: https://developers.openai.com/api/docs/quickstart
