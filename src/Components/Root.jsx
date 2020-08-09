import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import createStore from '../store';

import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const store = createStore();

const App = ({ match : { params } }) =>
  <>
    <AddTodo />
    <VisibleTodoList filter={params.filter} />
    <Footer />
  </>

export default () =>
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path='/:filter?' component={App} />
    </BrowserRouter>
  </Provider>
