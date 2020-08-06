let nextTodoId = 0;

const FilterLink = ({ filter, children, currentFilter, onClick }) => {
  return filter === currentFilter ? <span>{children}</span> :
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick(filter)
      }} >
      {children}
    </a>
}

const AddTodo = ({ onAddClick }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''
      }}>Add Todo</button>
    </div>
  )
}

const Todo = ({ completed, text, onClick }) =>
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>

const TodoList = ({todos, onTodoClick }) =>
  <ul>
    {todos.map(todo =>
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>

const Footer = ({ currentFilter, onFilterClick }) =>
  <p>
    Show:
    {'  '}
    <FilterLink filter='SHOW_ALL' currentFilter={currentFilter} onClick={onFilterClick}>
      All
    </FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_ACTIVE' currentFilter={currentFilter} onClick={onFilterClick}>
      Active
    </FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_COMPLETED' currentFilter={currentFilter} onClick={onFilterClick}>
      Completed
    </FilterLink>&nbsp;&nbsp;
  </p>

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
        <AddTodo onAddClick={(text) => {
          store.dispatch({
            type: 'ADD_TODO', text, id: nextTodoId++
          });
        }}/>
        <TodoList todos={visibleTodos} onTodoClick={id => {
          store.dispatch({
            type: 'TOGGLE_TODO', id
          })
        }} />
        <Footer
          currentFilter={this.currentFilter}
          onFilterClick={filter => store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })}
        />
      </div>
    )
  }
}
