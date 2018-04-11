import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import tabs from './tabs';
import orders from './orders';

export default combineReducers({
  tabs,
  orders,
  form: formReducer,
})