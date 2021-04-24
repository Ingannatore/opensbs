import ActionModel from '../action.model';

const Types = {
    SET_TARGET: 'client/target/set',
    RESET_TARGET: 'client/target/reset',
};

const setTarget = (target: string): ActionModel => ({
    type: Types.SET_TARGET,
    payload: target,
    meta: null,
});

const resetTarget = (): ActionModel => ({
    type: Types.RESET_TARGET,
    payload: null,
    meta: null,
});

export default {
    Types,
    setTarget,
    resetTarget,
};
