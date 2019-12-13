import Actions from '../actions';
import SignalrMessage from '../interfaces/signalr-message';
import SocketAction from '../interfaces/socket-action';

const createMessage = (action: SocketAction): SignalrMessage => {
    return {
        recipient: action.meta.path,
        moduleId: action.meta.module,
        command: action.meta.command,
        payload: action.payload
    };
};

const sendMessage = (hub: any, action: SocketAction): void => {
    if (action.meta.empty) {
        hub.invoke(action.meta.method).catch((err: any) => {
            return console.error(err.toString());
        });
    } else {
        hub.invoke(action.meta.method, createMessage(action)).catch((err: any) => {
            return console.error(err.toString());
        });
    }
};

export default (hub: any) => {
    return function (store: any) {
        hub.on('RefreshState', (data: string) => {
            return store.dispatch({
                type: Actions.Types.REFRESH_STATE,
                payload: JSON.parse(data)
            });
        });

        return function (next: any) {
            return function (action: any) {
                if (action.meta && action.meta.socket) {
                    sendMessage(hub, action);
                }

                return next(action);
            };
        };
    };
};
