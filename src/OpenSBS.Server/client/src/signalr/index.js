import Actions from '../actions';

const Methods = {
    START_SCENARIO: 'StartScenario',
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
                if (action.meta && action.meta.socket) {
                    switch (action.type) {
                        case Actions.Types.START_SCENARIO:
                            hub.invoke(Methods.START_SCENARIO).catch((err) => {
                                return console.error(err.toString());
                            });
                            break;
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
