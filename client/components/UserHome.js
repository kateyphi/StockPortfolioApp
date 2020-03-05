import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


// This component renders on the '/' route when a user is logged in. 
const UserHome = (props)=> {
    const {nickname} = props
    return (   
    <div>
      <h3>Welcome, {nickname}!</h3>
      <p>Click on Transactions to view a list of all of the transactions you have made.</p>
      <p>Click on Portfolio to view your stocks and see how they are doing. You can also buy new stocks!</p>
    </div>
)
}

// Maps the user's nickname to the component's props. 
const mapState = state => {
  return {
    nickname: state.user.nickname
  }
}


export default connect(mapState)(UserHome)


UserHome.propTypes = {
  email: PropTypes.string
}