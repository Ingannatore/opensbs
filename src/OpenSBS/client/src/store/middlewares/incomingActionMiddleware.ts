import ClientAction from '../clientAction';

export default (hub: any) => (store: any) => {
    hub.on('OnServerAction', (data: ClientAction) => {
        return store.dispatch(data);
    });

    return (next: any) => (action: ClientAction) => next(action);
};
