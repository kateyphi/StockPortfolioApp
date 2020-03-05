const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3333
const db = require('./db/db.js')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({db: db})
dbStore.sync()
const passport = require('passport')


// register users with passport 
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

//logging middleware
app.use(morgan('dev'))

// serves up static files 
app.use(express.static(path.join(__dirname, '..','public')));

//body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// session middleware 
app.use(session({
    secret: process.env.SESSION_SECRET || 'uh oh', 
    store: dbStore,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// sets up api routes 
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

// sync database and start listening 
db.sync().then(function(){app.listen(port, function(){
    (`Listening on port ${port}.`)
    })
})