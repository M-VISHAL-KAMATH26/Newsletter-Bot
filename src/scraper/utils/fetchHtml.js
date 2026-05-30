const axios = require('axios')

const fetchHtml = async (url) => {
  const { data } = await axios.get(url, {
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; NewsletterBot/1.0)'
    }
  })
  return data
}

module.exports = fetchHtml