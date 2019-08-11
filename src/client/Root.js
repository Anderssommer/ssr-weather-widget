// Startup point for the client side application
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers';
import configureStore from 'redux-mock-store';

// pass along serverside state (Or empty object if it does not exist).
const store = createStore(reducers, window.INITIAL_STATE || {}, applyMiddleware(thunk));

export const mockStore = configureStore([thunk])

export default props => (
    <Provider store={store}>
        {props.children}
    </Provider>
);