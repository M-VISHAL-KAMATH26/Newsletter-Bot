const fs = require('fs')
const path = require('path')
const scrapeNodeWeekly = require('./sources/nodeWeekly')
const scrapeReactStatus = require('./sources/reactStatus')
const scrapeTldrAi = require('./sources/tldrAi')

const OUTPUT_PATH = path.resolve(__dirname, '../../output/raw.json')

const runScraper = async () => {
  console.log('🕷️  Scraping sources...')

  const results = await Promise.allSettled([
    scrapeNodeWeekly(),
    scrapeReactStatus(),
    scrapeTldrAi()
  ])

  const data = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)

  const failed = results.filter(r => r.status === 'rejected')
  if (failed.length) {
    failed.forEach((f, i) => console.warn(`⚠️  Source ${i} failed:`, f.reason?.message))
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2))
  console.log(`✅  Scraped ${data.length} sources → output/raw.json`)

  return data
}

module.exports = runScraper