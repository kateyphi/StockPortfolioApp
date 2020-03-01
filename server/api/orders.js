const router = require('express').Router()
const {User, Order} = require('../db/models')

router.get('/', async function(req,res,next){
    try {
        const orders = await Order.findAll()
        res.json(orders)
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
