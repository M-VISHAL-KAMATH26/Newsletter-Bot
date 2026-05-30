const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const injectContent = require('./injectContent')

const TEMPLATE_PATH = path.resolve(__dirname, '../../templates/poster.html')
const OUTPUT_PATH = path.resolve(__dirname, '../../output/poster.png')

const runPosterGenerator = async (scrapedData) => {
  console.log('🎨 Generating poster...')

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8')
  const html = injectContent(template, scrapedData)

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()

  await page.setViewport({ width: 1080, height: 1080 })
  await page.setContent(html, { waitUntil: 'networkidle0' })

  await page.screenshot({
    path: OUTPUT_PATH,
    fullPage: true
  })

  await browser.close()
  console.log('✅  Poster saved → output/poster.png')

  return OUTPUT_PATH
}

module.exports = runPosterGenerator