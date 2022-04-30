import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';
import chatReducer from './chatReducer';
import mailReducer from './mailReducer';
import kanbanReducer from './kanbanReducer';
import pricingReducer from './pricingReducer';
import sideBarReducer from './sidebarReducer';
import integrationReducer from './integrationReducer';
import advisoryReducer from './advisoryReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
  mail: mailReducer,
  kanban: kanbanReducer,
  form: formReducer,
  pricing : pricingReducer,
  sidebar : sideBarReducer,
  integrations : integrationReducer,
  advisor : advisoryReducer,
  tasks : taskReducer
});

export default rootReducer;
