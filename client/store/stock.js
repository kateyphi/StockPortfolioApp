import axios from 'axios'
import key from '../../secrets'
const alpha = require('alphavantage')({key})

const GET_STOCKS = 'GET_STOCKS'

const defaultStocks = {}

const gotStocks = stocks => ({
    type: GET_STOCKS,
    stocks
})

export const getStocks = (userId) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/orders/${userId}/stocks`)
        let stocks = {}
        for (let i=0; i<data.length; i++){
            stocks[data[i].symbol] ? stocks[data[i].symbol].qty += data[i].quantity : stocks[data[i].symbol] = {qty: data[i].quantity}
        }
        for (let key in stocks){
            let quote = await alpha.data.quote(key)
            let price = quote['Global Quote']['05. price']
            stocks[key]['price'] = price
        }
        let stocksArr = Object.values(stocks)
        stocks['total'] = stocksArr.map(x=>x.qty*x.price).reduce((a,b)=>a+b)
        console.log(stocks)
        dispatch(gotStocks(stocks))
    } catch (error) {
        console.error(error)
    }
}

export default function(state = defaultStocks, action){
    switch (action.type){
        case GET_STOCKS:
            return action.stocks
        default:
            return state
    }
}