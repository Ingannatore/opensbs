import Action from '../models/action';

const isSocketAction = (action: Action): boolean => {
    return !!(action.meta?.socket);
};

export default (hub: any) => (store: any) => (next: any) => (action: Action) => {
    if (isSocketAction(action)) {
        hub.invoke('OnClientAction', action)
        .then((action?: Action) => {
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
