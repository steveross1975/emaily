//THIS IS AN ACTION CREATOR

import axios from 'axios';
//REDUX TYPE
import { FETCH_USER } from './types';

const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
