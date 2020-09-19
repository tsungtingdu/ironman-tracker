import axios from 'axios'
import cheerio from 'cheerio'

const crawler = async (url) => {
  const res = await axios.get(url)
  const count = getPostCount(res)
  return count
}

function getPostCount(res) {
  const $ = cheerio.load(res.data)
  let text = $('.subscription-group').text()
  text = text.split(' ')
  text = text.filter(i => i.length > 0 && i[0] !== '\n')
  return Number(text[5])
}

export default crawler
