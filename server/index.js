const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3333
const db = require('./db/db.js')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({db: db})
const passport = require('passport')
dbStore.sync()
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', require('./api'))
app.use(session({
    secret: process.env.SESSION_SECRET || 'uh oh', 
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user,done)=>{
    try {
        done(null, user.id)        
    } catch (error) {
        done(error)
    }
})
passport.deserializeUser(async (id,done)=>{
    try {
        const user = await db.models.user.findById(id)
        done(null,user)
    } catch (error) {
        done(error)
    }
})
// serves index.html 
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

// error handler

app.use(function(err,req,res,next){
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

db.sync().then(function(){app.listen(port, function(){
    console.log(`Listening on port ${port}.`)
    })
})