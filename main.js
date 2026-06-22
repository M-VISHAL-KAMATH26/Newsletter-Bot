require('dotenv').config()
const runScraper = require('./src/scraper/index')
const runSummariser = require('./src/summariser/index')
const runPosterGenerator = require('./src/poster/index')
const pushToGitHub = require('./src/notifier/index')

async function run() {
  console.log(' Newsletter bot starting...')

  const scrapedData = await runScraper()
  const newsletter = await runSummariser(scrapedData)
  await runPosterGenerator(scrapedData)
  await pushToGitHub()

  console.log('\n All done!')
}

run()