const router = require('express').Router()
const musicRouter = require('./musicRouter')
const userRouter = require('./userRouter')
const deezerController = require('../controllers/deezerController')
const newsApiController = require('../controllers/newsApiController')

router.get('/', (req, res) => res.status(200).json({ msg: 'Welcome to Music Server' }))
router.use('/users', userRouter)
router.use('/musics', musicRouter)

// deezer api 
router.get('/search-song/:keyword', deezerController.getSong)

// news api
router.get('/music-news', newsApiController.getNews)

module.exports = router