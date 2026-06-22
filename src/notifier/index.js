const { Octokit } = require('@octokit/rest')
const fs = require('fs')
const path = require('path')

const POSTER_PATH = path.resolve(__dirname, '../../output/poster.png')
const NEWSLETTER_PATH = path.resolve(__dirname, '../../output/newsletter.md')

const pushToGitHub = async () => {
  console.log(' Pushing to GitHub...')

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const date = new Date().toISOString().split('T')[0]

  // push newsletter.md
  const newsletterContent = fs.readFileSync(NEWSLETTER_PATH, 'utf-8')
  await upsertFile(octokit, owner, repo, `${date}/newsletter.md`, Buffer.from(newsletterContent).toString('base64'), `📰 Newsletter ${date}`)

  // push poster.png
  const posterContent = fs.readFileSync(POSTER_PATH)
  await upsertFile(octokit, owner, repo, `${date}/poster.png`, posterContent.toString('base64'), ` Poster ${date}`)

  console.log(`  Pushed to GitHub → github.com/${owner}/${repo}/tree/main/${date}`)
}

const upsertFile = async (octokit, owner, repo, filePath, content, message) => {
  let sha
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: filePath })
    sha = data.sha
  } catch (e) {
    // file doesn't exist yet — that's fine
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content,
    ...(sha && { sha })
  })
}

module.exports = pushToGitHub