const router = require('express').Router()
const musicController = require('../controllers/musicController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)


router.post('/', musicController.create)
router.get('/', musicController.findAll)
router.get('/:id', authorization, musicController.findOne)
router.put('/:id', authorization ,musicController.update)
router.delete('/:id', authorization, musicController.delete)

// CRUD TODO

module.exports = router