import { combineReducers } from 'redux';
import ProblemsReducer from './reducer_problems';
import StatusReducer from './reducer_status';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  problems: ProblemsReducer,
  status: StatusReducer,
  form: formReducer
});

export default rootReducer;
