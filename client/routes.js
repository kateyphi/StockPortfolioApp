import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Register, SignIn, UserHome, Portfolio, Transactions, Home} from './components'
import {me, getAllOrders, getStocks} from './store'
import PropTypes from 'prop-types'

class Routes extends React.Component {
    componentDidMount(){
        this.props.loadInitialData()
    }
    render(){
        const {isLoggedIn} = this.props
        return (
            <Switch>
                {isLoggedIn ? (
                    <Switch>
                        <Route exact path="/" component={UserHome} />
                        <Route path="/portfolio" component={Portfolio} />
                        <Route path="/transactions" component={Transactions} /> 
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/register" component={Register} />
                    </Switch>
                )}
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.id
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Routes))

Routes.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  }