const injectContent = (template, scrapedData) => {
  const date = new Date().toDateString()

  const nodeArticles = scrapedData.find(d => d.source === 'nodeweekly')?.articles || []

  const get = (i) => nodeArticles[i] || { title: 'Stay tuned!', description: '' }

  return template
    .replace('{{DATE}}', date)
    .replace('{{FEATURED_TITLE}}', get(0).title)
    .replace('{{FEATURED_DESC}}', get(0).description || '')
    .replace('{{CARD1_TITLE}}', get(1).title)
    .replace('{{CARD1_DESC}}', get(1).description || '')
    .replace('{{CARD2_TITLE}}', get(2).title)
    .replace('{{CARD2_DESC}}', get(2).description || '')
    .replace('{{CARD3_TITLE}}', get(3).title)
    .replace('{{CARD3_DESC}}', get(3).description || '')
    .replace('{{CARD4_TITLE}}', get(4).title)
    .replace('{{CARD4_DESC}}', get(4).description || '')
}

module.exports = injectContent