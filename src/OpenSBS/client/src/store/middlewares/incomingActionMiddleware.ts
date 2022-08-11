import ClientAction from 'store/clientAction';

const incomingActionMiddleware = (hub: any) => (store: any) => {
    hub.on('OnServerAction', (data: ClientAction) => {
        return store.dispatch(data);
    });

    return (next: any) => (action: ClientAction) => next(action);
};

export default incomingActionMiddleware;
