import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import setReducer from './reducers/sets';
import userReducer from './reducers/users';
import cardReducer from './reducers/cards';
import likeReducer from './reducers/likes';
import favoriteReducer from './reducers/favorites';
import subjectReducer from './reducers/subjects';
import searchReducer from './reducers/search';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    userReducer,
    setReducer,
    cardReducer,
    likeReducer,
    favoriteReducer,
    subjectReducer,
    searchReducer,
})

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configureStore;
