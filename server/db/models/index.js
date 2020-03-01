const User = require('./user')
const Order = require('./order')

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {User, Order}