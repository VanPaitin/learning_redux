import { v4 } from 'node-uuid';

const { connect } = ReactRedux;

const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

export default connect()(({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = ''
      }}>Add Todo</button>
    </div>
  )
})
