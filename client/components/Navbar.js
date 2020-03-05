import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'


//The Navbar component displays the Home link to anyone. It displays the Transactions and Portfolio links if the user is logged in, and the Sign In and Register components if the user is not logged in. 
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


// maps user info from redux store to this component's props. 
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email
  }
}

/// maps this handleClick method, which dispatches the logout function from 'store/user.js', to this component's props. 
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