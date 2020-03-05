const router = require('express').Router()
const {Order} = require('../db/models')


// This router finds and sends back all orders with the current user's userId. 

router.get('/stocks', async function(req,res,next){
    try {
        const stocks = await Order.findAll({
            where: {
                userId: req.user.id
            },
        })
        res.json(stocks)
    } catch (error) {
        next(error)
    }
})

// This router creates a new order and sends it back. 

router.post('/', async function(req,res,next){
    try {
        const order = await Order.create(req.body)
        res.json(order)
    } catch (error) {
        next(error)
    }
})


module.exports = router
