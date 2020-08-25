import { combineReducers } from 'redux';

const receiveTodos = 'RECEIVE_TODOS';
const removeTodo = 'REMOVE_TODO';

export default filter => {
  const ids = (state = [], action) => {
    if (action.type === removeTodo) {
      return state.filter(id => id !== action.id)
    }
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case receiveTodos:
        return action.response.map(todo => todo.id)
      default:
        return state;
    }
  }
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case receiveTodos:
        return false
      default:
        return state
    }
  }
  return combineReducers({ ids, isFetching })
}

export const getIds = state => state.ids
export const getIsFetching = state => state.isFetching
