const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router


// Sign in route. Finds the user with the entered email. If there is none, send first error. If there is a user with that name, check whether the password is correct and send 2nd error if not. Otherwise, login! 
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

// Register route. Creates new User instance and logs in. Sends error if user already exists. 

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

// Logout route. Logs out, destroys session, and redirects to the main page. 

router.post('/logout', (req,res,next)=>{
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

// Route to retrieve current user. 

router.get('/me', (req,res)=>{
    res.json(req.user)
})

