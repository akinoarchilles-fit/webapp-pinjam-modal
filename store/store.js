import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from "./root.reducer";
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

const middlewares = [promiseMiddleware, thunk];

export default createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
)