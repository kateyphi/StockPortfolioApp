import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const Register = (props) => {
    const {handleSubmit, error} = props
    return (
        <div>
            <form onSubmit={handleSubmit} name='register'>
                <div>
                    <label htmlFor="nickname">
                        <small>Nickname</small>
                    </label>
                    <input name="name" type="text" />
                </div>
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
                    <button type="submit">Register</button>
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

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit(evt){
            evt.preventDefault()
            const formName = evt.target.name
            const nickname = evt.target.nickname.value
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(auth(nickname, email,password,formName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)