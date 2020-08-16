const receiveTodos = 'RECEIVE_TODOS';
const removeTodo = 'REMOVE_TODO';

export default (state = {}, action) => {
  switch (action.type) {
    case receiveTodos:
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      })
      return nextState;
    case removeTodo:
      delete (state[action.id])
      return { ...state }
    default: return state
  }
}

export const getTodo = (state, id) => state[id]
