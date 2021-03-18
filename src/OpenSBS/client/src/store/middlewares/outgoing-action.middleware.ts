import ActionModel from '../action.model';

const isSocketAction = (action: ActionModel): boolean => {
    return !!(action.meta?.socket);
};

export default (hub: any) => (store: any) => (next: any) => (action: ActionModel) => {
    if (isSocketAction(action)) {
        hub.invoke('OnClientAction', action)
        .then((action?: ActionModel) => {
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
