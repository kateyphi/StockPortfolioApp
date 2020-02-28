const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/signin', async (req, res, next)=>{
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user){
            res.status(401).send('No user with that email address was found.')
        } else if (!user.correctPassword(req.body.password)){
            res.status(401).send('Incorrect password.')
        } else {
            req.login(user, err=> (err ? next(err) : res.json(user)))
        }
    } catch (error) {
        next(error)
    }
})

router.post('/register', async (req,res,next)=>{
    try {
        const user = await User.create(req.body)
        req.login(user, err => (err ? next(err) : res.json(user)))
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError'){
            res.status(401).send('User already exists.')
        } else {
            next(error)
        }
    }
})

router.post('/logout', (req,res,next)=>{
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

router.get('/me', (req,res)=>{
    res.json(req.user)
})

