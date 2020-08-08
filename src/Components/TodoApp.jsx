import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { todoApp } from '../todoReducer';

import FilterLink from './FilterLink';
import VisibleTodoList from './VisibleTodoList';

let nextTodoId = 1;

const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
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

const persistedState = {
  todos: [{ id: 0, text: 'Welcome Back', completed: false }]
}

export default () =>
  <Provider store={createStore(todoApp, persistedState, composeWithDevTools())}>
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
