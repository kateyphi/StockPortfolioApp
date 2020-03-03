import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Register, SignIn, UserHome, Portfolio, Transactions} from './components'
import {me} from './store'
import PropTypes from 'prop-types'

class Routes extends React.Component {
    componentDidMount(){
        this.props.loadInitialData()
    }
    render(){
        const {isLoggedIn} = this.props
        return (
            <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/register" component={Register} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/transactions" component={Transactions} />
                {isLoggedIn && (
                    <Switch>
                        <Route path="/home" component={UserHome} />
                    </Switch>
                )}
                <Route component={SignIn} />
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadInitialData(){
            dispatch(me())
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Routes))

Routes.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  }