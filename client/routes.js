import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Register, SignIn, UserHome, Portfolio, Transactions, Home} from './components'
import {me, getAllOrders, getStocks} from './store'
import PropTypes from 'prop-types'



class Routes extends React.Component {
    // Loads initial data (see mapDispatch below) as soon as Routes component mounts. 
    componentDidMount(){
        this.props.loadInitialData()
    }

    // Available routers depend on whether user is logged in or not. Notice '/' routes to the UserHome component if logged in, while it routes to the Home component if not. 
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
                        <Route exact path="/" component={Home} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/register" component={Register} />
                    </Switch>
                )}
            </Switch>
        )
    }
}

// A user is logged in if state.user.id is defined. 

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.id
    }
}

// Initial data to load: user info, all orders, and stocks. 

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