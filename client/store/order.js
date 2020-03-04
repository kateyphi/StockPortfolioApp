import axios from 'axios'
import Swal from 'sweetalert2'
import key from '../../secrets'
import {updateBalance} from './user'
const alpha = require('alphavantage')({key})


const GET_ORDER = 'GET_ORDER'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const REMOVE_ORDERS = 'REMOVE_ORDERS'

const defaultOrder = {}

const getOrder = order => ({
    type: GET_ORDER,
    order
})

export const removeOrders = () => ({type: REMOVE_ORDERS})

const gotAllOrders = orders => ({
    type: GET_ALL_ORDERS,
    orders
})

export const newOrder = (balance, symbol, quantity, userId) => async dispatch => {
    console.log('symbol', symbol, 'quantity', quantity, 'userid', userId, 'balance', balance)
    try {
        let quote = await alpha.data.quote(symbol)
        let price = quote['Global Quote']['05. price']
        console.log(price*quantity)
        console.log(balance)
        if (price*quantity < balance){
            let res = await axios.post('/api/orders', {symbol, quantity, price, userId})
            // dispatch(getOrder(res.data))
            dispatch(updateBalance(userId, price*quantity))
        } else {
            Swal.fire('You do not have enough money for that transaction.')
        }

    } catch (error) {
        console.error(error)
    }
}

export const getAllOrders = () => async dispatch => {
    try {
        let {data} = await axios.get(`/api/orders/stocks`)
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
        case REMOVE_ORDERS:
            return defaultOrder
        default:
            return state
    }
}