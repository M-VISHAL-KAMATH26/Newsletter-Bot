const cheerio = require('cheerio')
const fetchHtml = require('../utils/fetchHtml')

const scrapeReactStatus = async () => {
  const html = await fetchHtml('https://react.statuscode.com/latest')
  const $ = cheerio.load(html)
  const articles = []

  $('table.el-item').each((_, el) => {
    const title = $(el).find('span.mainlink a').first().text().trim()
    const link = $(el).find('span.mainlink a').first().attr('href')
    const description = $(el).find('p.desc').first().text().trim()

    if (title && link) {
      articles.push({ title, link, description })
    }
  })

  return { source: 'reactstatus', articles }
}

module.exports = scrapeReactStatus