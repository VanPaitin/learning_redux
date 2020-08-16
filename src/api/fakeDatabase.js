import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'Jesus Christ',
      completed: false
    },
    {
      id: v4(),
      text: 'Holy Spirit',
      completed: true
    },
    {
      id: v4(),
      text: 'El Shaddai',
      completed: false
    }
  ]
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = filter =>
  delay(500).then(() => {
    switch (filter) {
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed)
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed)
      default:
        return fakeDatabase.todos
    }
  })
