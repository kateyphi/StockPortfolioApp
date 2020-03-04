import axios from 'axios'
const alpha = require('alphavantage')({key: "FI2XWT2RH1UR5UMR"})

const GET_STOCKS = 'GET_STOCKS'
const REMOVE_STOCKS = 'REMOVE_STOCKS'

const defaultStocks = {
    loading: {
        symbol: '',
        price: 0,
        openPrice: 0, 
        qty: 0
      }
}

const gotStocks = stocks => ({
    type: GET_STOCKS,
    stocks
})
export const removeStocks = ()=>({
    type: REMOVE_STOCKS
})

export const getStocks = () => async dispatch => {
    try {
        const {data} = await axios.get(`/api/orders/stocks`)
        let stocks = {}
        for (let i=0; i<data.length; i++){
            stocks[data[i].symbol] ? stocks[data[i].symbol].qty += data[i].quantity : stocks[data[i].symbol] = {qty: data[i].quantity}
        }
        for (let key in stocks){
            let quote = await alpha.data.quote(key)
            stocks[key]['openPrice'] =  quote['Global Quote']['02. open']
            stocks[key]['price'] = quote['Global Quote']['05. price']
        }
        dispatch(gotStocks(stocks))
    } catch (error) {
        console.error(error)
    }
}

export default function(state = defaultStocks, action){
    switch (action.type){
        case GET_STOCKS:
            return action.stocks
        case REMOVE_STOCKS:
            return defaultStocks
        default:
            return state
    }
}