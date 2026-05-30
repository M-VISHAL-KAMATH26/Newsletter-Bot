const buildPrompt = (scrapedData) => {
  const sections = scrapedData.map(({ source, articles }) => {
    const items = articles
      .slice(0, 10)
      .map((a, i) => `${i + 1}. ${a.title} — ${a.description || 'No description'} (${a.link})`)
      .join('\n')

    return `### ${source.toUpperCase()}\n${items}`
  }).join('\n\n')

  return `
You are a tech newsletter writer for a developer community.

Below are this week's top articles from Node.js, React, and AI/ML sources.
Write a clean, engaging weekly newsletter post with the following structure:

1. A short punchy intro (2 lines max)
2. A section for each topic: Node.js, React, AI/ML
   - Pick the top 5 most interesting articles per section
   - For each: one line summary in simple developer-friendly language
   - Include the link
3. A short closing line encouraging the community

Keep the tone friendly, concise, and dev-focused. No fluff.

---
${sections}
`
}

module.exports = buildPrompt