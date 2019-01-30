import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Panel, Image, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { setAuthUser } from '../actions/authUser'

class Login extends Component {
  state = {
    userSelected: 'select',
    toHome: false,
  }

  handleChange = (e) => {
    const curUser = e.target.value

    this.setState(() => ({
      userSelected: curUser,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { userSelected } = this.state
    const { dispatch } = this.props

    if(userSelected !== 'select') {
      dispatch(setAuthUser(userSelected))

      this.setState(() => ({
        userSelected: 'select',
        toHome: true,
      }))
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if(this.state.toHome === true) {
      return <Redirect to={from} />
    }

    return (
      <Panel className="app-container">
        <Panel.Heading>
          <h2 className="center">Welcome to Would You Rather!</h2>
          <p className="center">Please sign in to continue</p>
        </Panel.Heading>
        <Panel.Body>
          <Image src="http://www.evolvefish.com/thumbnail.asp?file=assets/images/vinyl%20decals/EF-VDC-00035(black).jpg&maxx=300&maxy=0" className="login-image" />
          <h3 className="center">Sign in</h3>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={e => this.handleChange(e)}>
                <option value='select' key='select'>Select User</option>
                {this.props.users.map(user => (
                  <option value={user.id} key={user.id}>{user.name}</option>
                ))}
              </FormControl>
            </FormGroup>
            <Button type="submit" block>Sign In</Button>
          </form>
        </Panel.Body>
      </Panel>
    )
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const myUsers = userIds.map(id => ({
    id: users[id].id,
    name: users[id].name
  }))

  return {
    users: myUsers
  }
}

export default connect(mapStateToProps)(Login)