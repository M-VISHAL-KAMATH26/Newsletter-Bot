const fs = require('fs')
const path = require('path')
const buildPrompt = require('./prompt')

const OUTPUT_PATH = path.resolve(__dirname, '../../output/newsletter.md')

const runSummariser = async (scrapedData) => {
  console.log('🤖 Summarising with OpenRouter...')

  const prompt = buildPrompt(scrapedData)

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'poolside/laguna-xs.2:free',
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  console.log('API response:', JSON.stringify(data, null, 2))  // add this

  const newsletter = data.choices[0].message.content

  fs.writeFileSync(OUTPUT_PATH, newsletter)
  console.log('✅  Newsletter saved → output/newsletter.md')

  return newsletter
}

module.exports = runSummariser