import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers'; // Вам нужно создать файл reducers.js с корневым редюсером

export const store = createStore(rootReducer, applyMiddleware(thunk));
