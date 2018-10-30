import * as actions from '../actions';

const initialState = {
  sidebarVisible: false,
  viewContactDetails: false
};

export default (state = initialState, action) => {
  if (action.type === actions.SET_SIDEBAR_VISIBLE) {
    return {
      ...state,
      sidebarVisible: !state.sidebarVisible
    }
  } else if (action.type === actions.VIEW_CONTACT_DETAILS) {
    return {
      ...state,
      viewContactDetails: action.view
    }
  }

  return state;
}
