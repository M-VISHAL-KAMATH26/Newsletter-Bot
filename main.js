require('dotenv').config()
const runScraper = require('./src/scraper/index')
const runSummariser = require('./src/summariser/index')
const runPosterGenerator = require('./src/poster/index')

async function run() {
  console.log('🚀 Newsletter bot starting...')

  const scrapedData = await runScraper()
  const newsletter = await runSummariser(scrapedData)
  await runPosterGenerator(scrapedData)

  console.log('\n--- Newsletter Preview ---\n')
  console.log(newsletter.slice(0, 500) + '...')
  console.log('\n✅ All done! Check output/ folder.')
}

run()