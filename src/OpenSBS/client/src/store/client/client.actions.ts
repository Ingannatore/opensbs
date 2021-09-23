﻿import ActionModel from '../action.model';
import EntityTraceModel from '../../modules/entity-trace.model';

const Types = {
    SET_ZOOM: 'client/zoom/set',
    SET_TARGET: 'client/target/set',
    RESET_TARGET: 'client/target/reset',
    SET_AMMO: 'client/ammo/set',
    RESET_AMMO: 'client/ammo/reset',
};

const setZoom = (value: number): ActionModel => ({
    type: Types.SET_ZOOM,
    payload: value,
    meta: null,
});

const setTarget = (trace: EntityTraceModel): ActionModel => ({
    type: Types.SET_TARGET,
    payload: trace,
    meta: null,
});

const resetTarget = (): ActionModel => ({
    type: Types.RESET_TARGET,
    payload: null,
    meta: null,
});

const setAmmo = (id: string): ActionModel => ({
    type: Types.SET_AMMO,
    payload: id,
    meta: null,
});

const resetAmmo = (): ActionModel => ({
    type: Types.RESET_AMMO,
    payload: null,
    meta: null,
});

export default {
    Types,
    setZoom,
    setTarget,
    resetTarget,
    setAmmo,
    resetAmmo,
};
