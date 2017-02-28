import { combineReducers } from 'redux';
import ProblemsReducer from './reducer_problems';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  problems: ProblemsReducer,
  form: formReducer
});

export default rootReducer;
