import React from 'react';
import { connect } from 'react-redux';

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

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ACTIVE': return todos.filter(todo => !todo.completed)
    case 'SHOW_COMPLETED': return todos.filter(todo => todo.completed)
    default: return todos
  }
}

const toggleTodo = id => ({ type: 'TOGGLE_TODO', id })

const removeTodo = id => ({ type: 'REMOVE_TODO', id })

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  onTodoClick: id => dispatch(toggleTodo(id)),
  removeTodo: id => dispatch(removeTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
