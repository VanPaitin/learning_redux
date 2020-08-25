import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

export const actions = {
  toggleTodo: id => ({ type: 'TOGGLE_TODO', id }),
  removeTodo: (id) => ({ type: 'REMOVE_TODO', id }),
  requestTodos: filter => ({ type: 'REQUEST_TODOS', filter }),
  receiveTodos: (filter, response) => ({ type: 'RECEIVE_TODOS', filter, response })
}

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

export const getVisibleTodos = (state, filter) => {
  const ids = state.listByFilter[filter].ids;
  return ids.map(id => fromById.getTodo(state.byId, id))
}

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter])

export const todoApp = combineReducers({ byId, listByFilter })
