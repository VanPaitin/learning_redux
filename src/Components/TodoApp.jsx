let nextTodoId = 0;

const FilterLink = ({ filter, children, currentFilter }) => {
  return filter === currentFilter ? <span>{children}</span> :
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })
      }} >
      {children}
    </a>
}

export default class TodoApp extends React.Component {
  getVisibleTodos = () => {
    const { todos, visibilityFilter: filter } = this.props
    this.currentFilter = filter

    switch (filter) {
      case 'SHOW_ACTIVE': return todos.filter(todo => !todo.completed)
      case 'SHOW_COMPLETED': return todos.filter(todo => todo.completed)
      default: return todos
    }
  }

  render() {
    const visibleTodos = this.getVisibleTodos()

    return (
      <div>
        <input ref={node => {
          this.input = node
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO', text: this.input.value, id: nextTodoId++
          });
          this.input.value = ''
        }}>Add Todo</button>
        <ul>
          {visibleTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO', id: todo.id
                })
              }}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </li>)}
        </ul>
        <p>
          Show:
          {'  '}
          <FilterLink filter='SHOW_ALL' currentFilter={this.currentFilter}>All</FilterLink>&nbsp;&nbsp;
          <FilterLink filter='SHOW_ACTIVE' currentFilter={this.currentFilter}>Active</FilterLink>&nbsp;&nbsp;
          <FilterLink filter='SHOW_COMPLETED' currentFilter={this.currentFilter}>Completed</FilterLink>&nbsp;&nbsp;
        </p>
      </div>
    )
  }
}
