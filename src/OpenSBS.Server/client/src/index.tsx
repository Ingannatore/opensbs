import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import * as signalR from "@aspnet/signalr";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import rootReducer from './store/reducers';
import SignalrMiddleware from './store/middlewares/signalr';
import Home from './pages/home';
import Station from './pages/station';
import './index.css';

const hub = new signalR.HubConnectionBuilder().withUrl("/ws").build();
hub.start().catch(err => document.write(err));
const store = createStore(rootReducer, applyMiddleware(SignalrMiddleware(hub)));

render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={Home}/>
            <Route exact path="/station" component={Station}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
