import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me, getAllOrders, getStocks} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.loadInitialData()
  }

  render(){
    const {nickname} = this.props
    return (   
    <div>
      <h3>Welcome, {nickname}</h3>
    </div>
)
  }


}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    nickname: state.user.nickname
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadInitialData(){
          dispatch(me())
          dispatch(getAllOrders())
          dispatch(getStocks())
      },
      
  }
}
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}