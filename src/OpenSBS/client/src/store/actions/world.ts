import Action from '../models/action';

const Types = {
    REFRESH_WORLD_STATE: 'world/refreshState',
};

const refreshWorldState = (data: string): Action => ({
    type: Types.REFRESH_WORLD_STATE,
    payload: JSON.parse(data),
    meta: null
});

export default {
    Types,
    refreshWorldState
};
