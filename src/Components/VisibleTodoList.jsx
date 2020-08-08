const Todo = ({ completed, text, onClick, removeTodo }) =>
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a
      href='#'
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        removeTodo()
      }}>
      X
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

const { connect } = ReactRedux;

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
