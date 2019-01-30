import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading())

    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export const handleAddQuestion = (optionOneText, optionTwoText, author) => {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question
  }
}

export const handleAddQuestionAnswer = (authedUser, qid, answer) => {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => dispatch(addQuestionAnswer(authedUser, qid, answer)))
      .then(() => dispatch(hideLoading()))
  }
}

const addQuestionAnswer = (authUser, qId, answer) => {
  return {
    type: ADD_QUESTION_ANSWER,
    authUser,
    qId,
    answer
  }
}