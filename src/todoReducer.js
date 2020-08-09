import { combineReducers } from 'redux';

const addTodo = 'ADD_TODO';
const toggleTodo = 'TOGGLE_TODO';
const removeTodo = 'REMOVE_TODO';

const todo = (state, action) => {
  switch(action.type) {
    case addTodo:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case toggleTodo:
      const completed = state.completed
      return { ...state, completed: state.id == action.id ? !completed : completed }
    default:
      return state
  }
}

export const todos = (state = [], action) => {
  switch(action.type) {
    case addTodo:
      return [...state, todo(undefined, action)]
    case toggleTodo:
      return state.map(todoItem => todo(todoItem, action));
    case removeTodo:
      return state.filter(todoItem => todoItem.id !== action.id)
    default:
     return state
  }
}

// const visibilityFilter = (state = 'SHOW_ALL', action) => {
//   switch (action.type) {
//     case 'SET_VISIBILITY_FILTER': return action.filter
//     default: return state;
//   }
// }

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos, action
//     ),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

export const todoApp = combineReducers({ todos })
