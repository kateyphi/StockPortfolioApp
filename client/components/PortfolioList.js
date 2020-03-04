import React from 'react'
import {connect} from 'react-redux'
import {getStocks} from '../store'

class PortfolioList extends React.Component {
    constructor(props){
        super(props)
        this.getColor = this.getColor.bind(this)
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