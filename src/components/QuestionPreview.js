import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Image, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const QuestionPreview = props => {
  const { question, author, id, } = props
  const excerpt = question.optionOne.text

  return (
    <Fragment>
      <h4 className="preview-author">
        {author.name} asks:
      </h4>
      <Image src={author.avatarURL} className="author-profile-img" />
      <div className="preview-container">
        <h3>Would you rather</h3>
        <p>...{excerpt}...</p>
        <br />
        <LinkContainer to={`/questions/${id}`}>
          <Button>View Question</Button>
        </LinkContainer>
      </div>
    </Fragment>
  )
}

function mapStateToProps({ questions, users, authUser }, props ){
  let myId = null
  if(props.id) myId = props.id
  else myId = props.match.params.id

  const question = questions[myId]
  const excerpt = question.optionOne.text.length > 7 ? question.optionOne.text.substr(0, 10) : question.optionOne.text

  return {
    question,
    author: users[question.author],
    authUser: users[authUser],
    excerpt
  }
}

export default connect(mapStateToProps)(QuestionPreview)