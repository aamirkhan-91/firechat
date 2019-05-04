import { combineReducers } from 'redux';

import userReducer from './user';
import contactsReducer from './contacts';
import chatsReducer from './chats';
import uiReducer from './ui';

export default combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  chats: chatsReducer,
  ui: uiReducer,
});
