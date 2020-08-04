let addTodo = 'ADD_TODO';
let toggleTodo = 'TOGGLE_TODO';

const todo = (state, action) => {
  switch(action.type) {
    case addTodo:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case toggleTodo:
      const completed = state.completed
      return { ...state, completed: state.id == action.id ? !completed : completed }
    default:
      return state
  }
}

export const todos = (state = [], action) => {
  switch(action.type) {
    case addTodo:
      return [...state, todo(undefined, action)]
    case toggleTodo:
      return state.map(todoItem => todo(todoItem, action));
    default:
     return state
  }
}
