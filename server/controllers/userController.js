const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static register (req, res, next) {
        let { email, password } = req.body
        User.create({
            email,
            password
        })
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    email: data.email
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static async login (req, res, next) {
        try {
            let { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if(!user) throw { msg: 'invalid email or password', status: 400 }
            let comparePassword = comparePass(password, user.password)
            if(!comparePassword) throw { msg: 'invalid email or password', status: 400 }
            let payload = {
                id: user.id,
                email: user.email
            }
            let token = generateToken(payload)
            res.status(200).json({ token })
        } catch (err) {
            next(err)
        }
    }

    static async googleSignIn(req, res, next) {
        try {
            let { id_token } = req.body
            const client = new OAuth2Client(process.env.CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (user) {
                let data = {
                    id: user.id,
                    email: user.email
                }
                const token = generateToken(data)
                res.status(200).json({ token })
            } else {
                const newUser = await User.create({
                    email: payload.email,
                    password: 'google123'
                })
                let data = {
                    id: newUser.id,
                    email: newUser.email
                }
                const token = generateToken(data)
                res.status(201).json({ token })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController