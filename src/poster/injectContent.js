const injectContent = (template, scrapedData) => {
  const date = new Date().toDateString()

  const renderArticles = (articles) => {
    return articles.slice(0, 5).map(a => `
      <div class="article">
        <div class="article-title">${a.title}</div>
        <div class="article-desc">${a.description || ''}</div>
      </div>
    `).join('')
  }

  const getSource = (key) => {
    const found = scrapedData.find(d => d.source === key)
    return found ? renderArticles(found.articles) : '<div class="article"><div class="article-title">No articles found</div></div>'
  }

  return template
    .replace('{{DATE}}', date)
    .replace('{{NODEJS_ARTICLES}}', getSource('nodeweekly'))
    .replace('{{REACT_ARTICLES}}', getSource('reactstatus'))
    .replace('{{AIML_ARTICLES}}', getSource('tldr-ai'))
}

module.exports = injectContent