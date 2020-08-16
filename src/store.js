import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';

import { todoApp } from './todoReducer';
import { loadState, saveState } from './localstorage';

const addLoggingToDispatch = store => next => {
  return (action) => {
    console.group(action.type)
    console.log('%c Previous state: ', 'color: gray', store.getState())
    console.log('%c Action: ', 'color: blue', action)
    const returnValue = next(action);
    console.log('%c Next state: ', 'color: green', store.getState())
    console.groupEnd(action.type);

    return returnValue
  }
}

const addPromiseSupportToDispatch = _store => (next) => {
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(next)
    }
    return next(action)
  }
};

const wrapDispatchWithMiddleWares = (store, middleWares) => {
  middleWares.forEach(middleWare => {
    store.dispatch = middleWare(store)(store.dispatch)
  })
}

export default () => {
  // const persistedState = loadState()
  const middleWares = [promise]

  if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger());
  }

  // middleWares.push(addPromiseSupportToDispatch)
  const store = createStore(
    todoApp, //persistedState,
    composeWithDevTools(applyMiddleware(...middleWares))
  )

  store.subscribe(throttle(() => {
    const { byId, idsByFilter } = store.getState()

    saveState({ byId, idsByFilter })
  }, 1000))

  return store
}
