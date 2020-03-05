import axios from 'axios'
const alpha = require('alphavantage')({key: "FI2XWT2RH1UR5UMR"})

// action types
const GET_STOCKS = 'GET_STOCKS'
const REMOVE_STOCKS = 'REMOVE_STOCKS'

// initial state
const defaultStocks = {
    loading: {
        symbol: '',
        price: '',
        openPrice: '', 
        qty: ''
      }
}

// action creators 
const gotStocks = stocks => ({
    type: GET_STOCKS,
    stocks
})
export const removeStocks = ()=>({
    type: REMOVE_STOCKS
})

/* Thunk creators */ 


// In order to display stocks in the Portfolio component, we need to: 
// *Perform a get request to retrieve all of the user's orders. That will be an array of order objects.  
// *Create a new object 'stocks' that will be the stocks object that will be sent to the store.
// *For each order object in the array, we add it to the 'stocks' object and either set or update its 'quantity' property. 
// *For each key (which whill be a ticker symbol) in the 'stocks' object, we find its open price and current price. These will be used to determine its color on the PortfolioList component. 

// Example: Suppose data = [{symbol: 'msft', quantity: 3}, {symbol: 'msft', quantity: 2}, {symbol: 'ibm', quantity: 4}]. 
// Then 'stocks' will become, making up price numbers, 
// {msft: {qty: 5, openPrice: 100, price: 105}, ibm: {qty: 4, openPrice: 50, price: 49}}

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

// Reducer 
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