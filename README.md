#  Weekly Dev Newsletter Bot

An automated weekly developer newsletter bot that scrapes the latest updates from Node.js, React, and AI/ML sources — summarises them using AI — and generates a ready-to-post newsletter with a visual poster. Completely free to run.

---

##  What It Does

Every week the bot:
1. **Scrapes** top developer newsletter sites for the latest articles
2. **Summarises** them using AI into a clean, developer-friendly newsletter
3. **Generates a poster** — a visual PNG ready to share on social media or community platforms
4. **Saves everything** to the `output/` folder for you to review and post manually

---

## Project Structure

```
newsletter-bot/
├── src/
│   ├── scraper/
│   │   ├── index.js              # Runs all scrapers in parallel
│   │   ├── sources/
│   │   │   ├── nodeWeekly.js     # Scrapes nodeweekly.com
│   │   │   ├── reactStatus.js    # Scrapes react.statuscode.com
│   │   │   └── tldrAi.js         # Fetches TLDR AI RSS feed
│   │   └── utils/
│   │       └── fetchHtml.js      # Shared axios HTTP utility
│   ├── summariser/
│   │   ├── index.js              # Calls OpenRouter API
│   │   └── prompt.js             # AI prompt template
│   └── poster/
│       ├── index.js              # Puppeteer screenshot logic
│       └── injectContent.js      # Injects articles into HTML template
├── templates/
│   └── poster.html               # Visual poster template (HTML/CSS)
├── output/                       # Generated files land here (git ignored)
│   ├── raw.json                  # Raw scraped articles
│   ├── newsletter.md             # AI-generated newsletter post
│   └── poster.png                # Visual poster image
├── main.js                       # Entry point 
├── config.js                     # Source URLs and output paths
├── .env                          # API keys 
└── package.json
```

---

##  Tech Stack

| Part | Tool | Cost |
|---|---|---|
| Scraping | axios + cheerio | Free |
| AI Summarisation | OpenRouter API | Free |
| Poster Generation | Puppeteer (headless Chrome) | Free |
| Scheduler | node-cron | Free |

---

##  Newsletter Sources

| Topic | Source |
|---|---|
| Node.js | nodeweekly.com |
| React | react.statuscode.com |
| AI/ML | tldr.tech/ai (RSS) |

---

##  Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/newsletter-bot.git
cd newsletter-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a free OpenRouter API key

- Go to [openrouter.ai](https://openrouter.ai)
- Sign up and create a free API key

### 4. Create your `.env` file

```
OPENROUTER_API_KEY=your_key_here
```

### 5. Run the bot

```bash
node main.js
```

---

##  Output

After running, check the `output/` folder:

- `raw.json` — all scraped articles from all 3 sources
- `newsletter.md` — the AI-written newsletter post ready to copy and share
- `poster.png` — visual poster image ready to attach to your community post

---

##  How It Works

```
node main.js
     ↓
Scrape nodeweekly + reactstatus + tldr-ai
     ↓
Send articles to OpenRouter AI
     ↓
AI writes newsletter post → newsletter.md
     ↓
Inject articles into HTML template
     ↓
Puppeteer screenshots it → poster.png
     ↓
Review output/ and post manually
```

---

##  Contributing

Contributions are welcome! Here are some ideas:

- Add new newsletter sources (Vue, Python, DevOps etc.)
- Improve the poster HTML/CSS design
- Add auto-posting to Dev.to, Reddit, LinkedIn
- Add Slack/email notification when output is ready
- Improve the AI prompt for better summaries

To contribute:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/add-vue-source`)
3. Commit your changes
4. Open a pull request

---

##  Requirements

- Node.js v18+
- Free OpenRouter account

---

