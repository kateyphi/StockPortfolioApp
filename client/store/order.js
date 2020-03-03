import axios from 'axios'
import key from '../../secrets'
import {updateBalance} from './user'
const alpha = require('alphavantage')({key})


const GET_ORDER = 'GET_ORDER'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

const defaultOrder = {}

const getOrder = order => ({
    type: GET_ORDER,
    order
})

const gotAllOrders = orders => ({
    type: GET_ALL_ORDERS,
    orders
})

export const newOrder = (symbol, quantity, userId) => async dispatch => {
    try {
        let quote = await alpha.data.quote(symbol)
        let price = quote['Global Quote']['05. price']
        let res = await axios.post('/api/orders', {symbol, quantity, price, userId})
        // dispatch(getOrder(res.data))
        dispatch(updateBalance(userId, price*quantity))
    } catch (error) {
        console.error(error)
    }
}

export const getAllOrders = (userId) => async dispatch => {
    try {
        let {data} = await axios.get(`/api/orders/${userId}/stocks`)
        dispatch(gotAllOrders(data))
    } catch (error) {
        console.error(error)
    }
}

export default function(state = defaultOrder, action){
    switch (action.type){
        // case GET_ORDER:
        //     return action.order
        case GET_ALL_ORDERS:
            return action.orders
        default:
            return state
    }
}