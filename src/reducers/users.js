import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/shared'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_QUESTION : {
      const { question } = action
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat(question.id),
        }
      }
    }
    case ADD_QUESTION_ANSWER : {
      const { authUser, qId, answer } = action
      return {
        ...state,
        [authUser]: {
          ...state[authUser],
          answers: {
            ...state[authUser].answers,
            [qId]: answer,
          }
        }
      }
    }
    default :
      return state
  }
}