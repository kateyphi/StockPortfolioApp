const router = require('express').Router()
const {User, Order} = require('../db/models')


router.get('/:userId/stocks', async function(req,res,next){
    try {
        const stocks = await Order.findAll({
            where: {
                userId: req.params.userId
            },
        })
        res.json(stocks)
    } catch (error) {
        next(error)
    }
})


router.post('/', async function(req,res,next){
    try {
        const order = await Order.create(req.body)
        res.json(order)
    } catch (error) {
        next(error)
    }
})


module.exports = router
