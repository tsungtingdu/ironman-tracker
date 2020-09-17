import axios from 'axios'
import cheerio from 'cheerio'

const crawler = async (item) => {
  let url = item[1]
  await axios.get(url).then(res => {
    const $ = cheerio.load(res.data)
    let text = $('.subscription-group').text()
    text = text.split(' ')
    text = text.filter(i => i.length > 0 && i[0] !== '\n')
    item[2] = Number(text[5])
  })
  return item
}

export default crawler