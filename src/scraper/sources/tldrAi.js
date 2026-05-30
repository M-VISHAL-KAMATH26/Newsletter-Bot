const axios = require('axios')
const cheerio = require('cheerio')

const scrapeTldrAi = async () => {
  const { data } = await axios.get('https://tldr.tech/api/rss/ai', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsletterBot/1.0)' }
  })
  const $ = cheerio.load(data, { xmlMode: true })
  const articles = []

  $('item').each((_, el) => {
    const title = $(el).find('title').text().trim()
    const link = $(el).find('link').text().trim()
    const description = $(el).find('description').text().trim().slice(0, 200)

    if (title && link) {
      articles.push({ title, link, description })
    }
  })

  return { source: 'tldr-ai', articles }
}

module.exports = scrapeTldrAi