import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

// Sign in form. On submit, see handleSubmit in mapDispatch at the bottom of this file. 
const SignIn = (props) => {
    const {handleSubmit, error} = props
    return (
        <div>
            <form onSubmit={handleSubmit} name='signin'>
                <div>
                    <label htmlFor="email">
                        <small>Email</small>
                    </label>
                    <input name="email" type="text" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
                {error && error.response && <div>{error.response.data}</div>}
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.user.error
    }
}

// When a user submits this form, this dispatches the 'auth' function from 'store/user.js', which signs them in and then gets initial data. 
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit(evt){
            evt.preventDefault()
            const formName = evt.target.name
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(auth(formName, email, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)