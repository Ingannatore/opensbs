import ActionModel from '../action.model';

export default (hub: any) => (store: any) => {
    hub.on('OnServerAction', (data: ActionModel) => {
        return store.dispatch(data);
    });

    return (next: any) => (action: ActionModel) => next(action);
};
