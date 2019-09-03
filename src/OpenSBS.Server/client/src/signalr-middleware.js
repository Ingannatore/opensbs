import Actions from './actions';

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
                if (action.socket && action.socket.send) {
                    switch (action.type) {
                        case Actions.Types.SET_STATE:
                            hub.invoke('SetState', action.payload.key, action.payload.value).catch((err) => {
                                return console.error(err.toString());
                            });
                            break;
                        default:
                            return console.error(`Unknown socket action: ${action.type}`);
                    }
                }

                return next(action);
            };
        };
    };
};
