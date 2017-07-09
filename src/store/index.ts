import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const initialState = Map<string, object>({});

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        thunk
    )
);

export default store;