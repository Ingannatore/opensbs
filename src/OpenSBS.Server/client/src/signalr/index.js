import Actions from '../actions';

const Methods = {
    UPDATE_STATE: 'UpdateState',
    REFRESH_STATE: 'RefreshState',
};

export default (hub) => {
    return function (store) {
        hub.on(Methods.REFRESH_STATE, (data) => {
            return store.dispatch({
                type: Actions.Types.REFRESH_STATE,
                payload: JSON.parse(data)
            });
        });

        return function (next) {
            return function (action) {
                if (action.socket && action.socket.send) {
                    switch (action.type) {
                        case Actions.Types.UPDATE_STATE:
                            hub.invoke(Methods.UPDATE_STATE, action.payload).catch((err) => {
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
