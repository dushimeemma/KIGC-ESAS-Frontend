import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import users from './users';
import roles from './roles';
import students from './students';
import rooms from './room';
import attendance from './attendance';
import finance from './finance';
import course from './course';
import seat from './seat';
import count from './count';

export default combineReducers({
  auth,
  errors,
  users,
  roles,
  students,
  rooms,
  attendance,
  finance,
  course,
  seat,
  count,
});
