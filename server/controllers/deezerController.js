const axios = require('axios')

class DeezerController {
  static getSong (req, res) {
    // panggil api disini
    // url deezer = https://api.deezer.com/search?q=rhoma irama
    
    const keyword = req.params.keyword
    axios({
      method: 'get',
      url: `https://api.deezer.com/search?q=${keyword}`
    })
      .then(response => {
        res.status(200).json({
          songs: response.data
        })
      })
      .catch(err => next(err))
  }
}

module.exports = DeezerController