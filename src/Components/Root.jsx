import createStore from '../store';

import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const { Provider } = ReactRedux

const store = createStore();

export default () =>
  <Provider store={store}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Provider>
