const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication (req, res, next) {
    try {
        let { token }  = req.headers
        let decoded = verifyToken(token)
        const user = await User.findOne({
            where: { email: decoded.email }
        })
        if(!user) throw { msg: 'authentication failed', status: 401 }
        else {
            req.userData = decoded
            next()
        }
    } catch (err) {
        next(err)
        // console.log(err, '>>>>>>> error')
        // let msg = err.msg || 'internal server error'
        // res.status(500).json({ error: msg })
    }
}

module.exports = authentication