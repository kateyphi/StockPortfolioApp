const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3333
const db = require('./db/db.js')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({db: db})
const passport = require('passport')
dbStore.sync()

passport.serializeUser((user,done)=>{
    try {
        done(null, user.id)        
    } catch (error) {
        done(error)
    }
})
passport.deserializeUser(async (id,done)=>{
    try {
        const user = await db.models.user.findByPk(id)
        done(null,user)
    } catch (error) {
        done(error)
    }
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '..','public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET || 'uh oh', 
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

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