import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList from './createList';

const addTodo = 'ADD_TODO';
const toggleTodo = 'TOGGLE_TODO';

export const actions = {
  toggleTodo: id => ({ type: 'TOGGLE_TODO', id }),
  removeTodo: (id, filter) => ({ type: 'REMOVE_TODO', id, filter }),
  receiveTodos: (filter, response) => ({ type: 'RECEIVE_TODOS', filter, response })
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

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

export const getVisibleTodos = (state, filter) => {
  const ids = state.listByFilter[filter];
  return ids.map(id => fromById.getTodo(state.byId, id))
}

export const todoApp = combineReducers({ byId, listByFilter })
