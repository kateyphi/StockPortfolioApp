const router = require('express').Router()
const {User} = require('../db/models')
const Sequelize = require('sequelize')


router.get('/:userId/balance', async function(req,res,next){
    try {
        const balance = await User.findByPk(req.params.userId, {attributes: ['balance']})
        res.json(balance)
    } catch (error) {
        next(error)
    }
})

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
