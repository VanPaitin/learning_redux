const receiveTodos = 'RECEIVE_TODOS';
const removeTodo = 'REMOVE_TODO';

export default filter => (state = [], action) => {
  if (action.filter !== filter) {
    return state;
  }

  switch (action.type) {
    case receiveTodos:
      return action.response.map(todo => todo.id)
    case removeTodo: return state.filter(id => id !== action.id)
    default:
      return state;
  }
}
