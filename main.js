require('dotenv').config()
const runScraper = require('./src/scraper/index')
const runSummariser = require('./src/summariser/index')

async function run() {
  console.log('🚀 Newsletter bot starting...')

  const scrapedData = await runScraper()
  const newsletter = await runSummariser(scrapedData)

  console.log('\n--- Newsletter Preview ---\n')
  console.log(newsletter.slice(0, 500) + '...')

  // Phase 4: poster will go here
}

run()