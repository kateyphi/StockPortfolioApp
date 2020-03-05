const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))

// Error handler. 
router.use(function (req,res,next){
    const err = new Error('Not found.')
    err.status = 404
    next(err)
})

// Exports router with both users and orders routes attached. 

module.exports = router