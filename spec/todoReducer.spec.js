import 'colors';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { todos } from '../src/todoReducer.js';

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]

  deepFreeze(stateBefore);
  deepFreeze(action)

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    { id: 0, text: 'Learn Redux', completed: false },
    { id: 1, text: 'Go shopping', completed: false }
  ]

  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }

  const stateAfter = [
    { id: 0, text: 'Learn Redux', completed: false },
    { id: 1, text: 'Go shopping', completed: true }
  ]

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
console.log('Add Todo test passed'.green.underline)

testToggleTodo();
console.log('Toggle todo test passed'.green.underline)
