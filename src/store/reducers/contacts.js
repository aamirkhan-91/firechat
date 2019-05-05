import * as actions from '../actions';

export default (state = {
  list: [], loading: false, search: '', selectedContact: null, viewContactDetails: false,
}, action) => {
  if (action.type === actions.SET_CONTACTS) {
    return {
      ...state,
      list: action.contacts,
    };
  } if (action.type === actions.SET_CONTACTS_LOADING) {
    return {
      ...state,
      loading: action.loading,
    };
  } if (action.type === actions.SET_CONTACT_SEARCH) {
    return {
      ...state,
      search: action.search,
    };
  } if (action.type === actions.SET_SELECTED_CONTACT) {
    return {
      ...state,
      selectedContact: action.contact,
    };
  }

  return state;
};
