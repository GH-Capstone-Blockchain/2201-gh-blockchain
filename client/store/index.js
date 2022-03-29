import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import projects from './projects';
import project from './singleProject';
import scientists from './scientists';
import contributions from './contributions';
import user from './user';
import conversion from './conversion';

const reducer = combineReducers({
  auth,
  project,
  projects,
  scientists,
  contributions,
  user,
  conversion
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
