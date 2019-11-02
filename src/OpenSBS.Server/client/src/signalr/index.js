import Actions from '../actions';

const createMessage = (action) => {
    return {
        recipient: action.meta.path,
        payload: action.payload ? action.payload : null
    };
};

const sendMessage = (hub, action) => {
    if (action.meta.empty) {
        hub.invoke(action.meta.method).catch((err) => {
            return console.error(err.toString());
        });
    } else {
        hub.invoke(action.meta.method, createMessage(action)).catch((err) => {
            return console.error(err.toString());
        });
    }
};

export default (hub) => {
    return function (store) {
        hub.on('RefreshState', (data) => {
            return store.dispatch({
                type: Actions.Types.REFRESH_STATE,
                payload: JSON.parse(data)
            });
        });

        return function (next) {
            return function (action) {
                if (action.meta && action.meta.socket) {
                    sendMessage(hub, action);
                }

                return next(action);
            };
        };
    };
};
