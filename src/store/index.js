/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/reducers';
import { ENABLE_REDUX_LOGGER } from 'src/config';
import rootSaga from 'src/saga/rootSaga';

const loggerMiddleware = createLogger();

export function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [thunkMiddleware, sagaMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
}
