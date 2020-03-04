import React from 'react'
import {connect} from 'react-redux'
import {getStocks} from '../store'
import key from '../../secrets'
const alpha = require('alphavantage')({key})

class PortfolioList extends React.Component {
    constructor(props){
        super(props)
        this.getColor = this.getColor.bind(this)
        this.setStocks = this.setStocks.bind(this)
        this.getTotal = this.getTotal.bind(this)
    }

    componentDidMount(){
        this.props.getStocks()
    }

    getColor(stock){
      let stocks = this.props.stocks
      if (stocks[stock].price < stocks[stock].openPrice){
        return 'red'
      } else if (stocks[stock].price === stocks[stock].openPrice){
        return 'grey'
      } else {
        return 'green'
      }
    }

    async setStocks(){
      console.log('props stocks', this.props.stocks)
      let stocks = {}
      let data = this.props.stocks
      for (let i=0; i<data.length; i++){
          stocks[data[i].symbol] ? stocks[data[i].symbol].qty += data[i].quantity : stocks[data[i].symbol] = {qty: data[i].quantity}
      }
      for (let key in stocks){
          let quote = await alpha.data.quote(key)
          stocks[key]['openPrice'] =  quote['Global Quote']['02. open']
          stocks[key]['price'] = quote['Global Quote']['05. price']
      }
      this.setState({stocks})
    }

    getTotal(stocks){
      let stocksArr = Object.values(stocks)
      return stocksArr.map(x=>x.qty*x.price).reduce((a,b)=>a+b, 0).toFixed(2)
    }

    render(){
        return (
        <div>
          <h3>Portfolio (${this.getTotal(this.props.stocks)})</h3>
          <table>
          {Object.keys(this.props.stocks).map(x=>(
              <tr>
                  <td id={`stock-${this.getColor(x)}`}>{x.toUpperCase()}</td>
                  <td>{this.props.stocks[x].qty} Shares</td>
                  <td>${(this.props.stocks[x].price*this.props.stocks[x].qty).toFixed(2)}</td>
              </tr>
          ))}
          </table>
        </div> 
      )
  }

}


const mapState = state => {
  return {
    id: state.user.id,
    stocks: state.stock
  }
}

const mapDispatchToProps = dispatch => ({
    getStocks: () => dispatch(getStocks())
  })

export default connect(mapState, mapDispatchToProps)(PortfolioList)