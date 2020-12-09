export default (state, { type, payload }) => {
  switch (type) {
    case 'get_todos':
      return state.todos;
    case 'add_todo':
      return { ...state, todos: [...state.todos, payload] };
    case 'todo_done':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === payload) return { ...todo, done: true };
          else return todo;
        }),
      };
    case 'delete_todo':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    default:
      return state;
  }
};
