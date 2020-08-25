import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions, getVisibleTodos, getIsFetching } from '../todoReducer';
import { fetchTodos } from '../api/fakeDatabase';

const Todo = ({ completed, text, onClick, removeTodo }) =>
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none', width: '200px', height: '30px' }}
  >
    {text}
    <a
      href='#'
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        removeTodo()
      }}>
      <i style={{ fontSize: '13px', color: '#000', float: 'right' }} className="fas fa-trash"></i>
    </a>
  </li>

const TodoList = ({ todos, onTodoClick, removeTodo }) =>
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} removeTodo={() => removeTodo(todo.id)}/>
    )}
  </ul>

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, requestTodos, receiveTodos } = this.props;

    requestTodos(filter);
    fetchTodos(filter).then(todos => receiveTodos(filter, todos));
  }

  render() {
    const { todos, toggleTodo, removeTodo, isFetching } = this.props

    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }

    return <TodoList todos={todos} onTodoClick={toggleTodo} removeTodo={removeTodo} />
  }
}

const mapStateToProps = (state, { match: { params: { filter: filterParam } } }) => {
  const filter = filterParam || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
}

export default withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))
