import { combineReducers } from 'redux';

const addTodo = 'ADD_TODO';
const toggleTodo = 'TOGGLE_TODO';
const removeTodo = 'REMOVE_TODO';

export const actions = {
  toggleTodo: id => ({ type: 'TOGGLE_TODO', id }),
  removeTodo: id => ({ type: 'REMOVE_TODO', id })
}

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

const byId = (state = {}, action) => {
  switch (action.type) {
    case addTodo:
    case toggleTodo:
      return {
        ...state, [action.id]: todo(state[action.id], action)
      }
    case removeTodo:
      delete (state[action.id])
      return { ...state }
    default: return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case addTodo: return [...state, action.id]
    case removeTodo: return state.filter(id => id !== action.id)
    default: return state
  }
}

const getAllTodos = state => state.allIds.map(id => state.byId[id])

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);

  switch (filter) {
    case 'active': return allTodos.filter(todo => !todo.completed)
    case 'complete': return allTodos.filter(todo => todo.completed)
    default: return allTodos
  }
}

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos, action
//     ),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

export const todoApp = combineReducers({ byId, allIds })
