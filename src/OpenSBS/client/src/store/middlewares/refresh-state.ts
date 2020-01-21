import WorldActions from '../actions/world';
import ServerActions from '../actions/server';
import Action from '../interfaces/action';

export default (hub: any) => (store: any) => {
    hub.on(WorldActions.Types.REFRESH_WORLD_STATE, (data: string) => {
        return store.dispatch({
            type: WorldActions.Types.REFRESH_WORLD_STATE,
            payload: JSON.parse(data)
        });
    });

    hub.on(ServerActions.Types.REFRESH_SERVER_STATE, (data: string) => {
        return store.dispatch({
            type: ServerActions.Types.REFRESH_SERVER_STATE,
            payload: JSON.parse(data)
        });
    });

    return (next: any) => (action: Action) => next(action);
};
