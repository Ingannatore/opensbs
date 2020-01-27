import Action from '../models/action';

const Types = {
    REFRESH_WORLD_STATE: 'RefreshWorldState',
};

const refreshWorldState = (data: string): Action => ({
    type: Types.REFRESH_WORLD_STATE,
    payload: JSON.parse(data)
});

export default {
    Types,
    refreshWorldState
};
