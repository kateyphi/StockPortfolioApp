const router = require('express').Router()
const {User} = require('../db/models')
const Sequelize = require('sequelize')

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

router.put('/balance', async function(req,res,next){
    try {
        await User.update(
            {
                balance: Sequelize.literal(`balance - ${req.body.amount}`)
            }, 
            {
                where: {
                 id: req.body.userId   
                }
            }
        )
    } catch (error) {
        next(error)
    }
})

module.exports = router
