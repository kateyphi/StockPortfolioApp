import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const Navbar = ({handleClick, isLoggedIn, userEmail}) => (
  <div>
    <nav>
      <h1>Stock Portfolio App</h1>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/register">Register</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/portfolio">Portfolio</Link>
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



export default connect(mapState)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}