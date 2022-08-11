import ClientAction from '../clientAction';

const isSocketAction = (action: ClientAction): boolean => {
    return !!(action.meta?.socket);
};

const outgoingActionMiddleware = (hub: any) => (store: any) => (next: any) => (action: ClientAction) => {
    if (isSocketAction(action)) {
        hub.invoke('OnClientAction', action)
            .then((action?: ClientAction) => {
                if (action) {
                    store.dispatch(action);
                }
            })
            .catch((err: any) => {
                return console.error(err.toString());
            });
    }

    return next(action);
};

export default outgoingActionMiddleware;
