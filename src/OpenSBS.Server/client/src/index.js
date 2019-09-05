import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers'
import App from './App'
import './index.css'
import signalrMiddleware from './signalr-middleware'
import * as signalR from "@aspnet/signalr";

const hub = new signalR.HubConnectionBuilder().withUrl("/ws").build();
hub.start().catch(err => document.write(err));
const store = createStore(rootReducer, applyMiddleware(signalrMiddleware(hub)));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
