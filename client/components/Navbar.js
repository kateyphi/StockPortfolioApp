import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn}) => (
    <nav>
      <h1>Play the Mock Market</h1>
      <div className="nav-links">
      <Link className="link" to="/">Home</Link>
        {isLoggedIn ? <> 
        <Link className="link" to="/transactions">Transactions</Link>
        <Link className="link" to="/portfolio">Portfolio</Link> 
        <button className="link" type="button" onClick={handleClick}>Log Out</button> </>
        : <>
        <Link className="link" to="/signin">Sign In</Link>
        <Link className="link" to="/register">Register</Link></>}
      </div>
    </nav>
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