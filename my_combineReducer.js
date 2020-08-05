const combineReducer = reducers => {
  return (state = {}, action) => {
    const newState = {}

    for (key in reducers) {
      newState[key] = reducers[key](state[key], action)
    }

    return newState;
  }
}
