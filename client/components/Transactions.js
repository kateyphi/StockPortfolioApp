import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store'

// This component renders a list of the user's transactions. 
class Transactions extends React.Component {
    constructor(props){
        super(props)
    }

    // Gets all orders when the component mounts. 
    componentDidMount(){
        this.props.getAllOrders()
    }

    // Maps the orders to a table displaying each order's symbol, number of shares bought, at what price they were bought, and on what date (cutting off the time info). 
    render(){
        const orders = this.props.order
        return (
        <div>
          <h3>Transactions</h3>
            <table>
            {orders.map(x=>(
                <tr>
                    <td>BUY ({x.symbol.toUpperCase()})</td>
    <td>{x.quantity} shares @ ${x.price} ea.</td>
    <td>{x.createdAt.slice(0,10)}</td>
                </tr>
            ))}
            </table>
        </div>
      )
  }

}

// Maps orders from redux store to props. 
const mapState = state => {
  return {
    order: state.order
  }
}

// Maps getAllOrders thunk to this component's props. 
const mapDispatchToProps = dispatch => ({
    getAllOrders: () => dispatch(getAllOrders())
  })

export default connect(mapState, mapDispatchToProps)(Transactions)