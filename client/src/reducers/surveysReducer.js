import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload; //action.payload returns an empty string '' if the user's not logged in or an object. Empty strings in JS are treated like a falsie expression. So, the instruction above means return an object or the boolean false
    default:
      return state;
  }
}
