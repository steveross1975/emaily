import { FETCH_USER } from '../actions/types';

//Redux reducer that returns a particular state depending on the action called
//Is responsible of creating the this.props.auth object we use in the React Components
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //action.payload returns an empty string '' if the user's not logged in or an object. Empty strings in JS are treated like a falsie expression. So, the instruction above means return an object or the boolean false
    default:
      return state;
  }
}

//Next step: look to the action creator
