import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Panel, Tabs, Tab } from 'react-bootstrap'
import QuestionPreview from './QuestionPreview'

class QuestionsList extends Component {
  state = {
    activeKey: 1,
  }

  handleSelect = (selectedTab) => {
    this.setState(() => ({
      activeKey: selectedTab
    }))
  }

  render() {
    return (
      <div className="app-container">
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
          justified
          className="list-tabs"
        >
          <Tab eventKey={1} title="Unanswered"></Tab>
          <Tab eventKey={2} title="Answered"></Tab>
        </Tabs>

        {this.state.activeKey === 1 ? (
          <Panel>
            <Panel.Body>
              <h2 className="center">Questions</h2>
              <ListGroup>
                {this.props.unansweredQuestions.map(id => (
                  <ListGroupItem key={id} className="preview-li">
                    <QuestionPreview id={id} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Panel.Body>
          </Panel>
        ) : (
          <Panel>
            <Panel.Body>
              <h2 className="center">Questions</h2>
              <ListGroup>
                {this.props.answeredQuestions.map(id => (
                  <ListGroupItem key={id} className="preview-li">
                    <QuestionPreview id={id} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Panel.Body>
          </Panel>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authUser, users, questions }) {
  const answeredQuestions = Object.keys(users[authUser].answers)
  const unansweredQuestions = Object.keys(questions).filter(questionId => {
    const match = answeredQuestions.filter(answeredQ => answeredQ === questionId)
    if(match === undefined || match.length === 0) return questionId
    return false
  })
  
  const answeredQuestionsByDate = answeredQuestions.sort((a,b) => (questions[a].timestamp - questions[b].timestamp) * -1)
  const unansweredQuestionsByDate = unansweredQuestions.sort((a,b) => (questions[a].timestamp - questions[b].timestamp) * -1)

  return {
    answeredQuestions: answeredQuestionsByDate,
    unansweredQuestions: unansweredQuestionsByDate,
  }
}

export default connect(mapStateToProps)(QuestionsList)