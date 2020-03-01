const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

module.exports = Order