import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { todoApp } from '../../todoReducer';

import FilterLink from './FilterLink';
import VisibleTodoList from './VisibleTodoList';

window.store = createStore(todoApp, composeWithDevTools());

let nextTodoId = 0;

const AddTodo = () => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO', text: input.value, id: nextTodoId++
        });
        input.value = ''
      }}>Add Todo</button>
    </div>
  )
}

const Footer = () =>
  <p>
    Show:
    {'  '}
    <FilterLink filter='SHOW_ALL'>All</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>&nbsp;&nbsp;
  </p>

export default () =>
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
