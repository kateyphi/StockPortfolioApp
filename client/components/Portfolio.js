import React from 'react'
import {connect} from 'react-redux'
import {newOrder} from '../store/order'

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt){
        evt.preventDefault()
        const symbol = evt.target.symbol.value
        const quantity = evt.target.quantity.value
        const userId = this.props.id
        this.props.newOrder(symbol, quantity, userId)
    }

    render(){
    const {balance} = this.props

        return (
        <div>
          <h3>Balance: ${balance}</h3>
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


const mapState = state => {
  return {
    balance: state.user.balance,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
    newOrder: (symbol, quantity, userId) => dispatch(newOrder(symbol, quantity, userId))
  })

export default connect(mapState, mapDispatchToProps)(Portfolio)

