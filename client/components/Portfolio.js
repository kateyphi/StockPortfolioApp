import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Portfolio = props => {
  const {balance} = props

  return (
    <div>
      <h3>Portfolio: ${balance}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    balance: state.user.balance
  }
}

export default connect(mapState)(Portfolio)

