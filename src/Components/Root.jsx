import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store';

import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const store = createStore();

export default () =>
  <Provider store={store}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Provider>
