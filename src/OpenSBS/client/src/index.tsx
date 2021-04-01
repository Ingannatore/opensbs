import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as signalR from '@microsoft/signalr';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import rootReducer from './store/reducers';
import IncomingActionMiddleware from './store/middlewares/incoming-action.middleware';
import OutgoingActionMiddleware from './store/middlewares/outgoing-action.middleware';
import HomePage from './pages/home';
import Station from './pages/station';
import './index.css';

const hub = new signalR.HubConnectionBuilder().withUrl('/ws').build();
hub.start().then(() => {
    hub.invoke('OnAfterConnect').catch((err: any) => {
        return console.error(err.toString());
    });
}).catch((err: any) => {
    return console.error(err.toString());
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        IncomingActionMiddleware(hub),
        OutgoingActionMiddleware(hub)
    ))
);

render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/station" component={Station}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
