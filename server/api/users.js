const router = require('express').Router()
const {User} = require('../db/models')
const Sequelize = require('sequelize')


// This router retrieves a user's balance. 
router.get('/:userId/balance', async function(req,res,next){
    try {
        const balance = await User.findByPk(req.params.userId, {attributes: ['balance']})
        res.json(balance)
    } catch (error) {
        next(error)
    }
})

// This router reduces the user's balance property by the amount that their transaction cost. 
router.put('/balance', async function(req,res,next){
    try {
        const user = await User.update(
            {
                balance: Sequelize.literal(`balance - ${req.body.amount}`)
            }, 
            {
                where: {
                 id: req.body.userId   
                }
            }
        )
        res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router
