import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Nav, NavItem, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { setAuthUser } from '../actions/authUser'

class Navigation extends Component {
  state = {
    activeKey: 4,
  }

  componentDidMount = () => {
    if(this.props.location.pathname === '/') {
      this.setState(() => ({
        activeKey: 1,
      }))
    }
  }

  handleSelect = (selectedKey) => {
    this.setState(() => ({
      activeKey: selectedKey,
    }))
  }
  
  handleClick = () => {
    const { dispatch } = this.props

    if(this.props.authUserName) {
      dispatch(setAuthUser(null))
    }
  }

  render() {
    return (

      <Nav bsStyle='tabs' className="nav" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
        <LinkContainer to='/' exact>
          <NavItem eventKey={1}>
              Home
          </NavItem>
        </LinkContainer>
        <LinkContainer to='/add'>
          <NavItem eventKey={2}>
              Create Question
          </NavItem>
        </LinkContainer>
        <LinkContainer to='/leaderboard'>
          <NavItem eventKey={3}>
              Leaderboard
          </NavItem>
        </LinkContainer>
        <LinkContainer className="nav-right" to='/login' onClick={this.handleClick}>
          <NavItem eventKey={4}>
              {this.props.authUserName ? 'Logout' : 'Login'}
          </NavItem>
        </LinkContainer>
        {this.props.authUserAvatar && (
          <NavItem disabled className="nav-right">
            Welcome, {this.props.authUserName}
            <Image src={this.props.authUserAvatar} circle className="nav-profile-img" />
          </NavItem>
        )}
      </Nav>
    )
  }
}

function mapStateToProps({ authUser, users }) {
  let authUserAvatar = null
  let authUserName = null

  if(authUser !== null){
    authUserAvatar = users[authUser].avatarURL;
    authUserName = users[authUser].name;
  }

  return {
    authUserAvatar,
    authUserName,
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))