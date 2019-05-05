import * as actions from '../actions';

const initialState = [];

export default (state = initialState, action) => {
  if (action.type === actions.SET_CHATS) {
    return action.chats;
  }

  return state;
};
