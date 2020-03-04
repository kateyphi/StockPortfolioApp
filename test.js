
const alpha = require('alphavantage')({key: process.env.API_KEY})

let quote = async function(){
    const butts = await alpha.data.quote('msft')
    console.log(butts)
}

console.log(process.env.API_KEY)

quote()