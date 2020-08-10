const axios = require('axios')

class NewsApiController {
  static getNews (req, res) {
    // panggil api disini
    
    const url = `http://newsapi.org/v2/top-headlines?country=id&category=music&apiKey=${process.env.NEWS_API_KEY}`
    axios({
      method: 'get',
      url: url
    })
      .then(response => {
        res.status(200).json({
          songs: response.data
        })
      })
      .catch(err => next(err))
  }
}

module.exports = NewsApiController