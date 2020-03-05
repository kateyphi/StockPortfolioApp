const User = require('./user')
const Order = require('./order')


// Define associations. Order and User have a one-to-many relationships. Creates a foreign key "userId" on the Order table. 

Order.belongsTo(User)
User.hasMany(Order)


// Export these models with the above associations. 
module.exports = {User, Order}