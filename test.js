const key = 'MX9TIOCVAX69DVCJ'
const alpha = require('alphavantage')({key})

let quote = async function(){
    const butts = await alpha.data.quote('msft')
    console.log(butts)
}

quote()