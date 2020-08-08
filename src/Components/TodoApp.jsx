import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { v4 } from 'node-uuid';
import throttle from 'lodash/throttle';


import { todoApp } from '../todoReducer';
import { loadState, saveState } from '../localstorage';

import FilterLink from './FilterLink';
import VisibleTodoList from './VisibleTodoList';

const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = ''
      }}>Add Todo</button>
    </div>
  )
}

const { Provider, connect } = ReactRedux

AddTodo = connect()(AddTodo)

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
