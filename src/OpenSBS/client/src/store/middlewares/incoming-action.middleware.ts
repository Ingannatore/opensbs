import Action from '../action.model';

export default (hub: any) => (store: any) => {
    hub.on('OnServerAction', (data: Action) => {
        return store.dispatch(data);
    });

    return (next: any) => (action: Action) => next(action);
};
