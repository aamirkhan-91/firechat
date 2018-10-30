import * as actions from '../actions';

const initialState = null;

export default (state = initialState, action) => {
  if (action.type === actions.SET_USER) {
    return action.user;
  }

  return state;
}