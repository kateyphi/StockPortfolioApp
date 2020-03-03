import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_BALANCE = 'UPDATE_BALANCE'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const updatedBalance = balance => ({type: UPDATE_BALANCE, balance})

export const me = () => async dispatch => {
    try {
        const res = await axios.get('/auth/me')
        dispatch(getUser(res.data || defaultUser))
    } catch (error) {
        console.error(error)
    }
}

export const auth = (method, email, password, nickname) => async dispatch => {
    let res
    try {
        res = await axios.post(`/auth/${method}`, {email, password, nickname})
    } catch (authError) {
        return dispatch(getUser({error: authError}))
    }

    try {
        dispatch(getUser(res.data))
        history.push('/home')
    } catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.post('/auth/logout')
        dispatch(removeUser())
        history.push('/login')
    } catch (error) {
        console.error(error)
    }
}

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

export default function(state = defaultUser, action){
    switch (action.type){
        case GET_USER:
            return action.user
        case REMOVE_USER: 
            return defaultUser
        case UPDATE_BALANCE: 
            return {...state, balance: state.balance}
        default:
            return state
    }
}