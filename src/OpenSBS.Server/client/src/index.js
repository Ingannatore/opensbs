import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux';
import * as signalR from "@aspnet/signalr";
import rootReducer from './reducers'
import SignalrMiddleware from './signalr'
import App from './App'
import './index.css'

const hub = new signalR.HubConnectionBuilder().withUrl("/ws").build();
hub.start().catch(err => document.write(err));
const store = createStore(rootReducer, applyMiddleware(SignalrMiddleware(hub)));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
