import createDataContext from '../createDataContext';
import actions from './actions';
import reducer from './reducer';

const INITIAL_STATE = {
  todos: [
    { id: 1, title: 'wash car', done: false },
    { id: 2, title: 'buy food', done: false },
    { id: 3, title: 'work', done: false },
  ],
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  INITIAL_STATE,
);
