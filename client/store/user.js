import axios from 'axios'
import history from '../history'
import {removeOrders, removeStocks, getAllOrders, getStocks} from '../store'

// action types 
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_BALANCE = 'UPDATE_BALANCE'

// initial state 
const defaultUser = {}

// action creators 
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const updatedBalance = balance => ({type: UPDATE_BALANCE, balance})


/* Thunk creators */

// Retrieves user data and dispatches it to the store
export const me = () => async dispatch => {
    try {
        const res = await axios.get('/auth/me')
        dispatch(getUser(res.data || defaultUser))
    } catch (error) {
        console.error(error)
    }
}

// This thunk creator either goes to the signin route or the register route, depending on which form invoked it (comes in through the 'method' parameter). It then grabs the initial data, dispatches it to the store, and redirects to home. 
export const auth = (method, email, password, nickname) => async dispatch => {
    let res
    try {
        res = await axios.post(`/auth/${method}`, {email, password, nickname})
    } catch (authError) {
        return dispatch(getUser({error: authError}))
    }

    try {
        dispatch(getUser(res.data))
        dispatch(getAllOrders())
        dispatch(getStocks())
        history.push('/')
    } catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

// When the logout button is pushed, this function posts to the logout route, and then dispatch the action creators that clear the store. 

export const logout = () => async dispatch => {
    try {
        await axios.post('/auth/logout')
        dispatch(removeUser())
        dispatch(removeOrders())
        dispatch(removeStocks())
        history.push('/login')
    } catch (error) {
        console.error(error)
    }
}


// When a user buys a stock, this function updates their balance in the database, then gets the new balance from the database and dispatches it to the store. 
export const updateBalance = (userId, amount) => async dispatch => { 
    try {
        await axios.put(`/api/users/balance`, {userId, amount})
    } catch (error) {
        console.error(error)
    }

    try {
        const {data} = await axios.get(`/api/users/${userId}/balance`)
        dispatch(updatedBalance(data.balance))
    } catch (error) {
        console.error(error)
    }
}

// Reducer. Notice that REMOVE_USER returns the default, blank user.

export default function(state = defaultUser, action){
    switch (action.type){
        case GET_USER:
            return action.user
        case REMOVE_USER: 
            return defaultUser
        case UPDATE_BALANCE: 
            return {...state, balance: action.balance}
        default:
            return state
    }
}