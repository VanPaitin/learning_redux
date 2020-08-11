import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';

import { todoApp } from './todoReducer';
import { loadState, saveState } from './localstorage';

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type)
    console.log('%c Previous state: ', 'color: gray', store.getState())
    console.log('%c Action: ', 'color: blue', action)
    const returnValue = rawDispatch(action);
    console.log('%c Next state: ', 'color: green', store.getState())
    console.groupEnd(action.type);

    return returnValue
  }
}

export default () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState, composeWithDevTools())

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  store.subscribe(throttle(() => {
    const { byId, allIds } = store.getState()

    saveState({ byId, allIds })
  }, 1000))

  return store
}
