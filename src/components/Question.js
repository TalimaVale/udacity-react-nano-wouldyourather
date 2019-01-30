import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { Button, Image, Panel, FormGroup, Radio, ProgressBar } from 'react-bootstrap'
import { handleAddQuestionAnswer } from '../actions/shared'

class Question extends Component {
  state = {
    answerSelected: 'none'
  }

  handleChange = (e) => {
    const answerSelected = e.target.id

    this.setState(() => ({
        answerSelected
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, authUser, question } = this.props
    const { answerSelected } = this.state
    const qId = question.id
    
    dispatch(handleAddQuestionAnswer(authUser.id, qId, answerSelected))
  }

  render() {
    if(this.props.validQ === false) {
      return <Redirect to='/404' />
    }

    const { question, author, votes, optionOneVotes, optionTwoVotes, authUserAnswer } = this.props

    return (
      <div>
        {authUserAnswer === null
          ? (
            <Panel className="app-container">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  {author.name} asks:
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Image src={author.avatarURL} className="author-profile-img"/>
                <h3>Would You Rather...</h3>
                <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Radio name="answers" id="optionOne" onChange={e => this.handleChange(e)}>
                      {question.optionOne.text}
                    </Radio>
                    <Radio name="answers" id="optionTwo" onChange={e => this.handleChange(e)}>
                      {question.optionTwo.text}
                    </Radio>
                  </FormGroup>
                  {this.state.answerSelected === 'none'
                    ? <Button disabled type="submit">Vote</Button>
                    : <Button type="submit">Vote</Button>
                  }
                </form>
              </Panel.Body>
            </Panel>
          ) : (
            <Panel className="app-container">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  Asked by {author.name}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Image src={author.avatarURL} className="author-profile-img" />
                <div className="q-result">
                  <h3>Results:</h3>
                  <Panel bsStyle="info">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">
                        Would you rather {question[authUserAnswer].text}?
                        {authUserAnswer === 'optionOne'
                          ? <Fragment>
                              <ProgressBar bsStyle="info" className="q-result-progress" now={optionOneVotes / votes * 100} label={`${optionOneVotes / votes * 100}%`} />
                              {optionOneVotes} out of {votes} votes
                            </Fragment>
                          : <Fragment>
                              <ProgressBar bsStyle="info" className="q-result-progress" now={optionTwoVotes / votes * 100} label={`${optionTwoVotes / votes * 100}%`} />
                              {optionTwoVotes} out of {votes} votes
                            </Fragment>
                        }
                      </Panel.Title>
                    </Panel.Heading>
                  </Panel>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">
                        Would you rather {authUserAnswer !== 'optionOne' ? question.optionOne.text : question.optionTwo.text}?
                        {authUserAnswer !== 'optionOne'
                          ? <Fragment>
                              <ProgressBar bsStyle="info" now={optionOneVotes / votes * 100} label={`${optionOneVotes / votes * 100}%`} />
                              {optionOneVotes} out of {votes} votes
                            </Fragment>
                          : <Fragment>
                              <ProgressBar bsStyle="info" now={optionTwoVotes / votes * 100} label={`${optionTwoVotes / votes * 100}%`} />
                              {optionTwoVotes} out of {votes} votes
                            </Fragment>
                        }
                      </Panel.Title>
                    </Panel.Heading>
                  </Panel>
                </div>
              </Panel.Body>
            </Panel>
          )
        }
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authUser }, props ){
  let myId = null
  if(props.id) myId = props.id
  else myId = props.match.params.id

  if(Object.keys(questions).filter(qId => qId === myId).length <= 0)
    return { validQ: false }

  const question = questions[myId]

  const optionOneVotes = question.optionOne.votes.length
  const optionTwoVotes = question.optionTwo.votes.length
  const votes = optionOneVotes + optionTwoVotes

  let authUserAnswer = null
  if(Object.keys(users[authUser].answers).some(answer => answer === question.id))
    authUserAnswer = users[authUser].answers[question.id]

  return {
    question,
    author: users[question.author],
    authUser: users[authUser],
    votes,
    optionOneVotes,
    optionTwoVotes,
    authUserAnswer,
  }
}

export default withRouter(connect(mapStateToProps)(Question))