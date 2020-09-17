import axios from 'axios'
import cheerio from 'cheerio'

const crawler =  async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let url = arr[i][1]
    await axios.get(url).then(res => {
      const $ = cheerio.load(res.data)
      let text = $('.subscription-group').text()
      text = text.split(' ')
      text = text.filter(i => i.length > 0 && i[0] !== '\n')
      arr[i][2] = Number(text[5])
    })
  }
  return arr
}

export default crawler