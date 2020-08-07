const Todo = ({ completed, text, onClick }) =>
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>

const TodoList = ({ todos, onTodoClick }) =>
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ACTIVE': return todos.filter(todo => !todo.completed)
    case 'SHOW_COMPLETED': return todos.filter(todo => todo.completed)
    default: return todos
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => ({
  onTodoClick: id => dispatch({ type: 'TOGGLE_TODO', id })
})

const { connect } = ReactRedux;

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
