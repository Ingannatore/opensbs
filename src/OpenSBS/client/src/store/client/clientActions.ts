import ClientAction from '../clientAction';
import EntityTrace from '../../models/entityTrace';
import Item from '../../models/item';

const Types = {
    SET_RADAR_SCALE: 'client/radar/scale/set',
    SET_MAP_SCALE: 'client/map/scale/set',
    SET_TARGET: 'client/target/set',
    RESET_TARGET: 'client/target/reset',
    SET_AMMO: 'client/ammo/set',
    RESET_AMMO: 'client/ammo/reset',
};

const setRadarScale = (value: number): ClientAction => ({
    type: Types.SET_RADAR_SCALE,
    payload: value,
    meta: null,
});

const setMapScale = (value: number): ClientAction => ({
    type: Types.SET_MAP_SCALE,
    payload: value,
    meta: null,
});

const setTarget = (trace: EntityTrace): ClientAction => ({
    type: Types.SET_TARGET,
    payload: trace,
    meta: null,
});

const resetTarget = (): ClientAction => ({
    type: Types.RESET_TARGET,
    payload: null,
    meta: null,
});

const setAmmo = (item: Item): ClientAction => ({
    type: Types.SET_AMMO,
    payload: item,
    meta: null,
});

const resetAmmo = (): ClientAction => ({
    type: Types.RESET_AMMO,
    payload: null,
    meta: null,
});

export default {
    Types,
    setRadarScale,
    setMapScale,
    setTarget,
    resetTarget,
    setAmmo,
    resetAmmo,
};
