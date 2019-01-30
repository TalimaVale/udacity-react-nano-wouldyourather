import React from 'react'
import { connect } from 'react-redux'
import { Image, Panel, Grid, Row, Col } from 'react-bootstrap'

const Leaderboard = props => {
  const { users } = props

  return (
    <Panel className="app-container">
      <Grid>
        {users.map(user => (
          <Row key={user.id} className="leader-row">
            <Col xs={4}>
              <Image src={user.avatarURL} className="author-profile-img" />
            </Col>
            <Col xs={4} className="leader-stats">
              <h3>{user.name}</h3>
              <br />
              <p>Answered Questions: {Object.keys(user.answers).length}</p>
              <p>Created Questions: {Object.keys(user.questions).length}</p>
            </Col>
            <Col xs={4} className="leader-score">
              <h3>Score:</h3>
              <h1>{user.score}</h1>
            </Col>
          </Row>
        ))}
      </Grid>
    </Panel>
  )
}

function mapStateToProps({ users }){
  const usersByScore = Object.values(users).map(user => ({
    score: Object.keys(user.answers).length + Object.keys(user.questions).length,
    ...user
  })).sort((a,b) => (a.score - b.score) * -1)

  return {
    users: usersByScore 
  }
}

export default connect(mapStateToProps)(Leaderboard)