import WorldActions from '../actions/world';
import ServerActions from '../actions/server';
import ReduxAction from '../interfaces/redux-action';
import SignalrRequest from '../interfaces/signalr-request';
import SignalrResponse from '../interfaces/signalr-response';
import SocketAction from '../interfaces/socket-action';

const isSignalrRequest = (action: ReduxAction): boolean => {
    return action.meta != null && action.meta.socket;
};

const createSignalrRequest = (action: SocketAction): SignalrRequest => {
    return {
        recipient: action.meta.recipient,
        command: action.meta.command,
        payload: action.payload
    };
};

const createReduxAction = (response: SignalrResponse): ReduxAction => {
    return {
        type: response.action,
        payload: response.payload,
        meta: null
    };
};

const invokeHubMethod = (hub: any, action: SocketAction): Promise<any> => {
    if (action.meta.empty) {
        return hub.invoke(action.meta.method);
    } else {
        return hub.invoke(
            action.meta.method,
            createSignalrRequest(action)
        );
    }
};

export default (hub: any) => {
    return function (store: any) {
        hub.on('RefreshWorldState', (data: string) => {
            return store.dispatch({
                type: WorldActions.Types.REFRESH_WORLD_STATE,
                payload: JSON.parse(data)
            });
        });
        hub.on('RefreshServerState', (data: string) => {
            return store.dispatch({
                type: ServerActions.Types.REFRESH_SERVER_STATE,
                payload: JSON.parse(data)
            });
        });

        return function (next: any) {
            return function (action: ReduxAction) {
                if (isSignalrRequest(action)) {
                    invokeHubMethod(hub, action)
                    .then((response?: SignalrResponse) => {
                        if (response) {
                            store.dispatch(createReduxAction(response));
                        }
                    })
                    .catch((err: any) => {
                        return console.error(err.toString());
                    });
                }

                return next(action);
            };
        };
    };
};
