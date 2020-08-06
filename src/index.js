// import { createStore } from 'redux';
import TodoApp from './Components/TodoApp';

/* Counter Section

let increment = 'INCREMENT';
let decrement = 'DECREMENT';

let counter = (state = 0, action) => {
  switch (action.type) {
    case increment:
      return state + 1;

    case decrement:
      return state - 1

    default:
      return state
  }
}

const store = createStore(counter);

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: increment })}
      onDecrement={() => store.dispatch({ type: decrement })} />,
    document.getElementById('root')
  )
}

*/


ReactDOM.render(
  <TodoApp />, document.getElementById('root')
)
