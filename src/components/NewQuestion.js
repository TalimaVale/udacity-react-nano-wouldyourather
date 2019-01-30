import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Panel, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, authUser } = this.props
    const { optionOne, optionTwo } = this.state

    return dispatch(handleAddQuestion(optionOne, optionTwo, authUser))
      .then(() => {
        this.setState(() => ({
          toHome: true,
        }))
      })
  }

  handleChange = (e) => {
    const id = e.target.id
    const text = e.target.value

    this.setState((prevState) => ({
      ...prevState,
      [id]: text
    }))
  }

  render() {
    const { optionOne, optionTwo } = this.state

    if(this.state.toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <Panel className="app-container">
        <Panel.Heading className="new-q-heading">
          Create New Question
        </Panel.Heading>
        <Panel.Body className="new-q-body">
          <h4>Complete the question:</h4>
          <br />
          Would you rather ...
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl type="text" id="optionOne" placeholder="Enter Option One Text Here" value={optionOne} onChange={this.handleChange}/>
              <ControlLabel>OR</ControlLabel>
              <FormControl type="text" id="optionTwo" placeholder="Enter Option Two Text Here" value={optionTwo} onChange={this.handleChange}/>
            </FormGroup>
            {optionOne === '' || optionTwo === '' 
              ? <Button type="submit" disabled block>Submit</Button>
              : <Button type="submit" block>Submit</Button>
            }
          </form>
        </Panel.Body>
      </Panel>
    )
  }
}

function mapStateToProps({ authUser }){
  return {
    authUser
  }
}

export default connect(mapStateToProps)(NewQuestion)