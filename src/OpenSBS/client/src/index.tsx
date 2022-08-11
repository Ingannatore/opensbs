import * as React from 'react';
import * as signalR from '@microsoft/signalr';
import {configureStore} from "@reduxjs/toolkit";
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from 'pages/home';
import JoinPage from 'pages/join';
import CartographyTerminal from 'pages/terminals/cartographyTerminal';
import IntelligenceTerminal from 'pages/terminals/intelligenceTerminal';
import NavigationTerminal from 'pages/terminals/navigationTerminal';
import TacticalTerminal from 'pages/terminals/tacticalTerminal';
import ClientAction from "store/clientAction";
import clientReducer from "store/client/clientSlice";
import IncomingActionMiddleware from 'store/middlewares/incomingActionMiddleware';
import OutgoingActionMiddleware from 'store/middlewares/outgoingActionMiddleware';
import serverReducer from "store/server/serverSlice";
import spaceshipReducer from "store/spaceship/spaceshipSlice";
import 'index.css';

const hub = new signalR.HubConnectionBuilder().withUrl('/ws').build();
hub.start().then(() => {
    hub.invoke('OnAfterConnect').catch((err: any) => {
        return console.error(err.toString());
    });
}).catch((err: any) => {
    return console.error(err.toString());
});

const store = configureStore({
    reducer: {
        client: clientReducer,
        server: serverReducer,
        spaceship: spaceshipReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(IncomingActionMiddleware(hub))
        .concat(OutgoingActionMiddleware(hub)),
});

hub.on('OnServerAction', (data: ClientAction) => {
    return store.dispatch(data);
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/join" element={<JoinPage/>}/>
                <Route path="/terminal/navigation" element={<NavigationTerminal/>}/>
                <Route path="/terminal/tactical" element={<TacticalTerminal/>}/>
                <Route path="/terminal/intelligence" element={<IntelligenceTerminal/>}/>
                <Route path="/terminal/cartography" element={<CartographyTerminal/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
);
