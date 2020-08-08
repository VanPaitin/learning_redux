import { createStore } from 'redux';

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
console.log(store.getState());
store.dispatch({ type: increment })
console.log(store.getState())

const render = () => {
  document.body.innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener('click', () => store.dispatch({ type: increment }))

expect(
  counter(0, {type: increment})
).toEqual(1);

expect(
  counter(1, { type: increment })
).toEqual(2);

expect(
  counter(2, { type: decrement })
).toEqual(1);

expect(
  counter(1, { type: decrement })
).toEqual(0);

console.log("Tests Passed");
