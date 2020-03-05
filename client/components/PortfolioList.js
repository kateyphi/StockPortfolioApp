import React from 'react'
import {connect} from 'react-redux'
import {getStocks} from '../store'

// This component displays a list of the user's stocks, how many shares they have, and their current value. 
class PortfolioList extends React.Component {
    constructor(props){
        super(props)
        this.getColor = this.getColor.bind(this)
        this.getTotal = this.getTotal.bind(this)
    }
// retrieves stock info when component mounts. 
    componentDidMount(){
        this.props.getStocks()
    }
// this method determines the color of the stock based on how its current price compares to the opening price. 
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

    // This method determines the total value of all of the stocks at this time. 
    getTotal(stocks){
      let stocksArr = Object.values(stocks)
      return stocksArr.map(x=>x.qty*x.price).reduce((a,b)=>a+b, 0).toFixed(2)
    }

    // Renders a table of stocks, number of shares, and current price of those shares. 
    render(){
        return (
        <div>
          <h3>Portfolio (${this.getTotal(this.props.stocks)})</h3>
          <table className='table'>
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

// maps the stocks from the redux store to this component's props.  
const mapState = state => {
  return {
    stocks: state.stock
  }
}

// maps the getStocks method from 'store/stock.js' to this component's props. 
const mapDispatch = dispatch => ({
    getStocks: () => dispatch(getStocks())
  })

export default connect(mapState, mapDispatch)(PortfolioList)