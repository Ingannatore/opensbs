import WorldActions from '../actions/world';
import ServerActions from '../actions/server';
import Action from '../models/action';

export default (hub: any) => (store: any) => {
    hub.on(WorldActions.Types.REFRESH_WORLD_STATE, (data: string) => {
        return store.dispatch(WorldActions.refreshWorldState(data));
    });

    hub.on(ServerActions.Types.REFRESH_SERVER_STATE, (data: string) => {
        return store.dispatch(ServerActions.refreshServerState(data));
    });

    return (next: any) => (action: Action) => next(action);
};
