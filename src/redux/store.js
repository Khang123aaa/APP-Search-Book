// redux/store.js 
import { applyMiddleware, combineReducers, createStore } from 'redux';
import BookReducer from './bookReducer';

// Import thư viện Sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  book: BookReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// Thêm middleware Sagas vào redux
sagaMiddleware.run(rootSaga);

export default store;

