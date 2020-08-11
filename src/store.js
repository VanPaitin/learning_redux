import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';

import { todoApp } from './todoReducer';
import { loadState, saveState } from './localstorage';

export default () => {
  const persistedState = loadState()
  const store = createStore(todoApp, persistedState, composeWithDevTools())

  store.subscribe(throttle(() => {
    const { byId, allIds } = store.getState()

    saveState({ byId, allIds })
  }, 1000))

  return store
}
