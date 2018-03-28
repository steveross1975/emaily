//THIS IS AN ACTION CREATOR

import axios from 'axios';
//REDUX TYPE
import { FETCH_USER } from './types';

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };
//refactored below

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
  //res.data is the object container of the user data
};
