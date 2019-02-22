# Would You Rather

Would You Rather is a web application for the popular conversation game 'Would You Rather...?', originally developed as one of three projects required for Udacity's React Developer Nanodegree program.

The project features a single page application with views for:
  * Login (user selection dropdown)
  * Lists of questions (home)
  * Create new question,
  * Leaderboard
  * Individual question (both answered and unanswered)
  
A user must first login to access the app, and is then transfered to the home page where they are presented with two lists; questions they have not answered and questions they have answered. A user may add new questions to the game via the 'Create Question' page. A user may view their score (calculated from user activity) compared to all users via the 'Leaderboard'. A user can answer and/or view results for an individual question by selecting the question from the home page. Enjoy playing!

The `_DATA.js` file represents a local/testing database and methods that let you access the data.

The [Create React App](https://github.com/facebook/create-react-app) was used to bootstrap the project.

## Installation

To start playing, first install all project dependencies:
```
npm install
```
Then, run the application with:
```
npm start
```

## File Breakdown

```bash
├── README.md - This file.
├── package.json # npm package manager file
├── public
│   └── index.html # HTML file to launch application
└── src
    ├── actions
    │   ├── authUser.js # File containing actions which affect the 'authUser' portion of our redux store
    │   ├── questions.js # File containing actions which affect the 'questions' portion of our redux store
    │   ├── shared.js # File containing actions which affect more than one portion of our redux store
    │   └── users.js # File containing actions which affect the 'users' portion of our redux store
    ├── components
    │   ├── App.js # This is the root of your app. Contains static HTML right now.
    │   ├── FourOFour.js # Presentational component for nonexistent pages
    │   ├── Leaderboard.js # Presentational component displaying the game's top users
    │   ├── Login.js # The game's login page, select a user to play
    │   ├── Nav.js # The game's navigation bar
    │   ├── NewQuestion.js # The game's 'Create Question' page, add a new question to the game
    │   ├── Question.js # View for individual question, allows user to answer and view results
    │   ├── QuestionPreview.js # Presentational component to view question excerpts, used by QuestionsList.js
    │   └── QuestionsList.js # The game's home view, lists current user's answered and unanswered questions
    ├── middleware
    │   ├── index.js # File which imports all middleware and calls applyMiddleware
    │   └── logger.js # Logger middleware, helps to debug state changes, always last middleware called
    ├── reducers
    │   ├── authUser.js # Reducer which handles actions affecting the 'authUser' portion of our redux store
    │   ├── index.js # File which imports all middleware and calls combineReducers
    │   ├── questions.js # Reducer which handles actions affecting the 'questions' portion of our redux store
    │   └── users.js # Reducer which handles actions affecting the 'users' portion of our redux store
    ├── utils
    │   ├── _DATA.js # Provided backend by Udacity
    │   └── api.js # API created to provide our app with access to the provided _DATA file
    ├── index.js # Used for DOM rendering only
    └── index.scss # Global styles, converted from css to scss
```

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute | Type   | Description       |
|-----------|--------|-------------------|
| id        | String | The user’s unique identifier |
| name      | String | The user’s first name  and last name |
| avatarURL | String | The path to the image file |
| questions | Array  | A list of ids of the polling questions this user created |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type   | Description |
|-----------|--------|-------------|
| id        | String | The question’s unique identifier |
| author    | String | The author’s unique identifier |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option |
| optionTwo | Object | The second voting option |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description |
|-----------|--------|-------------|
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option |

Code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description |
|---------------|--------|-------------|
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description |
|-----------|--------|-------------|
| id        | String | The id of the question that was posted |
| author    | String | The id of the user who posted the question |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created |

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description |
|------------|--------|-------------|
| authedUser | String | The id of the user who answered the question |
| qid        | String | The id of the question that was answered |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |