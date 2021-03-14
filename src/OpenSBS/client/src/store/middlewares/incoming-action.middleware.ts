import Action from '../action.model';

export default (hub: any) => (store: any) => {
    hub.on('OnClientAction', (data: Action) => {
        return store.dispatch(data);
    });

    return (next: any) => (action: Action) => next(action);
};
