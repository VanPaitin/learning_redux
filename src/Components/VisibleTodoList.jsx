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

export default class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getVisibleTodos = () => {
    const { todos, visibilityFilter: filter } = store.getState();

    switch (filter) {
      case 'SHOW_ACTIVE': return todos.filter(todo => !todo.completed)
      case 'SHOW_COMPLETED': return todos.filter(todo => todo.completed)
      default: return todos
    }
  }

  render() {
    const visibleTodos = this.getVisibleTodos();

    return (
      <TodoList todos={visibleTodos} onTodoClick={id => {
        store.dispatch({
          type: 'TOGGLE_TODO', id
        })
      }} />
    )
  }
}
