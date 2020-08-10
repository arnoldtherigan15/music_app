const { Music } = require('../models')
/*
1. balikin data JSON
2. kasih status code
 */
class MusicController {
    static findOne (req, res) {
        let { id } = req.params
        Music.findOne({
            where: { id }
        })
            .then(data => {
                res.status(200).json({ music: data })
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll (req, res) {
        Music.findAll({
            where: {
                userId: req.userData.id
            }
        })
            .then(data => {
                res.status(201).json({ musics: data })
            })
            .catch(err => {
                next(err)
            })
    }

    static create (req, res, next) {
        let userId = req.userData.id
        let { title, genre, artist, image, preview } = req.body
        Music.create({
            title,
            genre,
            artist,
            userId,
            image,
            preview
        })
            .then(data => {
                res.status(201).json({ music: data })
            })
            .catch(err => {
                next(err)
            })
    }

    static update (req, res) {
        console.log(req.params, '>>>>>>>>>>> controller');
        let { id } = req.params
        let { title, genre, artist, image, preview } = req.body
        Music.update({
            title,
            genre,
            artist,
            image,
            preview
        }, { 
            where: { id }
         })
            .then(data => {
                res.status(201).json({ music: data })
            })
            .catch(err => {
               next(err)
            }) 
    }

    static delete (req, res) {
        let { id } = req.params
        Music.destroy({ 
            where: { id }
         })
            .then(data => {
                res.status(201).json({ msg: 'deleted' })
            })
            .catch(err => {
               next(err)
            }) 
    }
}

module.exports = MusicController