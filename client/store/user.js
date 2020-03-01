import axios from 'axios'
import history from '../history'
import IEXCloudClient from 'node-iex-cloud'
const iex = new IEXCloudClient(axios, {
    sandbox: true,
    publishable: "pk_5dc3a0f611cb4f21a53cd9175692a2e2 ",
    version: "stable"
  });

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})


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

export default function(state = defaultUser, action){
    switch (action.type){
        case GET_USER:
            return action.user
        case REMOVE_USER: 
            return defaultUser
        default:
            return state
    }
}