import { RECEIVE_QUESTIONS } from '../actions/questions'
import { ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/shared'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case ADD_QUESTION : {
      const { question } = action
      return {
        ...state,
        [question.id]: action.question,
      }
    }
    case ADD_QUESTION_ANSWER :
      const { authUser, qId, answer } = action
      return {
        ...state,
        [qId]: {
          ...state[qId],
          [answer]: {
            ...state[qId][answer],
            votes: state[qId][answer].votes.concat(authUser)
          }
        }
      }
    default :
      return state
  }
}