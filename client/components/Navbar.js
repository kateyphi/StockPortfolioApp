import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, userEmail}) => (
  <div>
    <nav>
      <h1>Stock Portfolio App</h1>
      <div>
      <Link to="/">Home</Link>
        {isLoggedIn ? <> 
        <Link to="/transactions">Transactions</Link>
        <Link to="/portfolio">Portfolio</Link> 
        <button type="button" onClick={handleClick}>Log Out</button> </>
        : <>
        <Link to="/signin">Sign In</Link>
        <Link to="/register">Register</Link></>}

      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email
  }
}

const mapDispatch = dispatch => {
    return {
      handleClick() {
        console.log('logging out...')
        dispatch(logout())
      }
    }
  }

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}