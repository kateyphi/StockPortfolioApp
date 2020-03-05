import axios from 'axios'
import Swal from 'sweetalert2'
import {updateBalance} from './user'
const alpha = require('alphavantage')({key: "FI2XWT2RH1UR5UMR"})

// action types
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const REMOVE_ORDERS = 'REMOVE_ORDERS'

// initial state
const defaultOrder = {}

// action creators
export const removeOrders = () => ({type: REMOVE_ORDERS})

const gotAllOrders = orders => ({
    type: GET_ALL_ORDERS,
    orders
})

/* Thunk creators */ 

// When a user buys a stock, this function finds the price, and if the user has enough money, it makes a post request to the orders route, updates the user's balance, and reloads the page. If the user does not have enough money, a modal alert pops up. 
export const newOrder = (balance, symbol, quantity, userId) => async dispatch => {
    try {
        let quote = await alpha.data.quote(symbol)
        let price = quote['Global Quote']['05. price']
        if (price*quantity < balance){
            await axios.post('/api/orders', {symbol, quantity, price, userId})
            dispatch(updateBalance(userId, price*quantity))
            location.reload()
        } else {
            Swal.fire('You do not have enough money for that transaction.')
        }

    } catch (error) {
        console.error(error)
    }
}

// Retrieves all the orders. 

export const getAllOrders = () => async dispatch => {
    try {
        let {data} = await axios.get(`/api/orders/stocks`)
        dispatch(gotAllOrders(data))
    } catch (error) {
        console.error(error)
    }
}


// Reducer. 
export default function(state = defaultOrder, action){
    switch (action.type){
        case GET_ALL_ORDERS:
            return action.orders
        case REMOVE_ORDERS:
            return defaultOrder
        default:
            return state
    }
}