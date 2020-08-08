const toggleTodo = todo => Object.assign({}, todo, {
  completed: !todo.completed
})

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };

  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore)

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo();
console.log("Todo test passed!")