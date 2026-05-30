require('dotenv').config()
const runScraper = require('./src/scraper/index.js')

async function run() {
  console.log('🚀 Newsletter bot starting...')
  const data = await runScraper()
  console.log('Phase 2 done. Articles scraped:', data.map(d => `${d.source}: ${d.articles.length}`))
  // Phase 3: summariser will go here
  // Phase 4: poster will go here
}

run()