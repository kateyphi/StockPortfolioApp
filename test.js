// alpha vantage key: MX9TIOCVAX69DVCJ 

const fetch = require('node-fetch')
const axios = require('axios')
const alpha = require('alphavantage')({key: 'MX9TIOCVAX69DVCJ'})

alpha.data.quote('msft').then(data=>{
    console.log(data['Global Quote']['05. price'])
})
