import React from 'react'
import {connect} from 'react-redux'
import {newOrder} from '../store'
import {withRouter} from 'react-router'

// This component has the form where users can buy stocks. 
class BuyStocks extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // When a user submits the form, the newOrder thunk dispatches newOrder from 'store/order.js' 
    handleSubmit(evt){
        evt.preventDefault()
        const symbol = evt.target.symbol.value
        const quantity = evt.target.quantity.value
        const userId = this.props.id
        const balance = this.props.balance
        this.props.newOrder(balance, symbol, quantity, userId)
    }

    // Renders the user's balance on top, then the form that accepts a ticker symbol and a quantity of shares to buy. On submit, see handleSubmit above. 
    render(){
    const {balance} = this.props
        return (
        <div>
          <h3>Balance: ${Number(balance).toFixed(2)}</h3>
          <form onSubmit={this.handleSubmit} name='buystock'>
                    <div>
                        <label htmlFor="symbol">
                            <small>Ticker Symbol</small>
                        </label>
                        <input name="symbol" type="text" />
                    </div>
                    <div>
                        <label htmlFor="quantity">
                            <small>Quantity</small>
                        </label>
                        <input name="quantity" type="number" />
                    </div>
                    <div>
                        <button type="submit">Buy</button>
                    </div>
                </form>
        </div>
      )
  }

}

// maps user info from redux store to this component's props.
const mapState = state => {
  return {
    balance: state.user.balance,
    id: state.user.id
  }
}

// maps newOrder thunk to this component's props. 
const mapDispatchToProps = dispatch => ({
    newOrder: (balance, symbol, quantity, userId) => dispatch(newOrder(balance, symbol, quantity, userId)),
  })

export default withRouter(connect(mapState, mapDispatchToProps)(BuyStocks))

