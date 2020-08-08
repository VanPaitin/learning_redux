import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';

import { todoApp } from '../todoReducer';
import { loadState, saveState } from '../localstorage';

import AddTodo from './AddTodo';
import FilterLink from './FilterLink';
import VisibleTodoList from './VisibleTodoList';

const { Provider } = ReactRedux

const persistedState = loadState()

const store = createStore(todoApp, persistedState, composeWithDevTools())

store.subscribe(throttle(() => saveState({ todos: store.getState().todos }), 1000))

export default () =>
  <Provider store={store}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Provider>

const Footer = () =>
  <p>
    Show:
    {'  '}
    <FilterLink filter='SHOW_ALL'>All</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>&nbsp;&nbsp;
  </p>
