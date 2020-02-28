import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})

export const me = () => async dispatch => {
    try {
        const res = await axios.get('/auth/me')
        dispatch(getUser(res.data || defaultUser))
    } catch (error) {
        console.error(error)
    }
}

export const auth = (email, password, method) => async dispatch => {
    let res
    try {
        res = await axios.post(`/auth/${method}`, {email, password})
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

export default function(state = defaultUser, action){
    switch (action.type){
        case GET_USER:
            return action.user
        default:
            return state
    }
}