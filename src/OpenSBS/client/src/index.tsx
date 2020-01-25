import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as signalR from '@microsoft/signalr';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import rootReducer from './store/reducers';
import RefreshStateMiddleware from './store/middlewares/refresh-state';
import SignalrMessageMiddleware from './store/middlewares/signalr-message';
import Home from './pages/home';
import Station from './pages/station';
import './index.css';

const hub = new signalR.HubConnectionBuilder().withUrl('/ws').build();
hub.start().catch(err => document.write(err));
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        RefreshStateMiddleware(hub),
        SignalrMessageMiddleware(hub)
    ))
);

render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={Home}/>
            <Route exact path="/station" component={Station}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);