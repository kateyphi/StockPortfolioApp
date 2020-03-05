const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

// Define the User model. Email must be unique. Encrypts password when user is created. 

const User = db.define('user', {
    nickname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        get(){
            return ()=> this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get(){
            return () => this.getDataValue('salt')
        }
    },
    balance: {
        type: Sequelize.DECIMAL,
        defaultValue: 5000
    }
}, {
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
})

// This method will check whether the password is correct when users sign in. 
User.prototype.correctPassword = function(candidatePassword){
    return User.encryptPassword(candidatePassword, this.salt()) === this.password()
}

User.generateSalt = function(){
    return crypto.randomBytes(16).toString('base64')
} 

User.encryptPassword = function(plainText, salt){
    const hash = crypto.createHash('RSA-SHA256')
    hash.update(plainText)
    hash.update(salt)
    return hash.digest('hex')
}

function setSaltAndPassword(user){
    if (user.changed('password')){
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}


module.exports = User