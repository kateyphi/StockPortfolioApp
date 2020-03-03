import React from 'react'
import {connect} from 'react-redux'
import {getStocks} from '../store'

class PortfolioList extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getStocks(this.props.id)
        console.log(this.props)
    }



    render(){
    this.props.getStocks(this.props.id)
        return (
        <div>
          <h3>Portfolio (${this.props.stocks.total})</h3>
          <table>
          {Object.keys(this.props.stocks).map(x=>(
              <tr>
                  <td>{x.toUpperCase()}</td>
                  <td>{this.props.stocks[x].qty} Shares</td>
                  <td>${this.props.stocks[x].price*this.props.stocks[x].qty}</td>
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
    getStocks: (userId) => dispatch(getStocks(userId))
  })

export default connect(mapState, mapDispatchToProps)(PortfolioList)