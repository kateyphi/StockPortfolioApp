const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async function(req,res,next){
    try {
        const users = await User.findAll({
            attributes: ['id', 'email']
        })
        res.json(users)
    } catch (error) {
        next(error)
    }
})

module.exports = router
