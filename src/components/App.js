import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Login from './Login'
import QuestionsList from './QuestionsList'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import FourOFour from './FourOFour'

function PrivateRoute ({ component: Component, authUser, ...rest }) {
  return (
    <Route {...rest} render={(props) => authUser !== null
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: {from: props.location} }} />
    } />
  )
}

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authUser, loading } = this.props
    
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            { loading === true // Only load components after store has finished loading data
              ? null
              : <div>
                  <Nav />
                  <Switch>
                    <Route path='/login' component={Login} />
                    <PrivateRoute authUser={authUser} path='/' exact component={QuestionsList} />
                    <PrivateRoute authUser={authUser} path='/questions/:id' component={Question} />
                    <PrivateRoute authUser={authUser} path='/add' component={NewQuestion} />
                    <PrivateRoute authUser={authUser} path='/leaderboard' component={Leaderboard} />
                    <PrivateRoute authUser={authUser} component={FourOFour} />
                  </Switch>
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ questions, authUser }) {
  return {
    loading: (Object.keys(questions).length === 0 && questions.constructor === Object),
    authUser,
  }
}

export default connect(mapStateToProps)(App)