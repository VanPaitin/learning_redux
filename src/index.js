import React from 'react';
import Root from './Components/Root';
import ReactDOM from 'react-dom';

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
  <Root />, document.getElementById('root')
)
