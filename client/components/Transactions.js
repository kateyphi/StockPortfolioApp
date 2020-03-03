import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store'

class Transactions extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getAllOrders(this.props.id)
    }

    // Need 'loading'. 
    render(){
        const orders = this.props.order
        console.log(orders)
        return (
        <div>
          <h3>Transactions Component.</h3>
          {/* <p>{JSON.stringify(orders)}</p> */}
            {/* <table>
            {orders.map(x=>(
                <tr>
                    <td>BUY ({x.symbol.toUpperCase()})</td>
            <td>{x.quantity} shares</td>
    <td>{x.createdAt}</td>
                </tr>
            ))}
            </table> */}
            <h2>Yup.</h2>
        </div>
      )
  }

}


const mapState = state => {
  return {
    id: state.user.id,
    stocks: state.stock,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => ({
    getAllOrders: (userId) => dispatch(getAllOrders(userId))
  })

export default connect(mapState, mapDispatchToProps)(Transactions)