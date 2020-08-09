import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import createStore from '../store';

import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const store = createStore();

export default () =>
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path='/:filter?'>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </Route>
    </BrowserRouter>
  </Provider>
