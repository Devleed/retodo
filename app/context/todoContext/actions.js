const getTodos = (state, dispatch) => () => {
  dispatch({ type: 'get_todos' });
};

const addTodo = (state, dispatch) => (todo, cb) => {
  dispatch({ type: 'add_todo', payload: todo });
  cb();
};

const todoDone = (state, dispatch) => (id) => {
  dispatch({ type: 'todo_done', payload: id });
};

const deleteTodo = (state, dispatch) => (id) => {
  dispatch({ type: 'delete_todo', payload: id });
};

export default {
  getTodos,
  addTodo,
  todoDone,
  deleteTodo,
};
