import axios from 'axios'
import key from '../../secrets'
const alpha = require('alphavantage')({key})


const GET_ORDER = 'GET_ORDER'

const defaultOrder = {}

const getOrder = order => ({
    type: GET_ORDER,
    order
})

export const newOrder = (symbol, quantity, userId) => async dispatch => {
    try {
        let quote = await alpha.data.quote(symbol)
        let price = quote['Global Quote']['05. price']
        let res = await axios.post('/api/orders', {symbol, quantity, price, userId})
        dispatch(getOrder(res.data))
    } catch (error) {
        console.error(error)
    }
}

export default function(state = defaultOrder, action){
    switch (action.type){
        case GET_ORDER:
            return action.order
        default:
            return state
    }
}