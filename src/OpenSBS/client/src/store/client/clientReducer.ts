import ClientAction from '../clientAction';
import ClientActions from './clientActions';
import ClientState from './clientState';
import Entity from '../../models/entity';
import EntityModule from '../../modules/entityModule';
import EntityTrace from '../../models/entityTrace';
import SensorsModule from '../../modules/sensors/sensorsModule';
import SpaceshipActions from '../spaceship/spaceshipActions';
import ModuleType from '../../modules/moduleType';
import Item from '../../models/item';

const defaultState: ClientState = {
    zoomFactor: 1,
    selectedTarget: null,
    selectedAmmo: null,
};

const existsTrace = (entity: Entity, trace: EntityTrace | null): boolean => {
    if (!trace) {
        return false;
    }

    const sensors = entity.modules.find(
        (module: Partial<EntityModule>) => module.type === ModuleType.SENSORS
    ) as SensorsModule;

    return sensors.traces.find(it => it.id === trace.id) != undefined;
}

const existsAmmo = (entity: Entity, ammo: Item | null): boolean => {
    if (!ammo) {
        return false;
    }

    return entity.cargo?.items.find(it => it.item.id === ammo.id) != undefined ?? false;
}

export default (state = defaultState, action: ClientAction) => {
    if (action.type === ClientActions.Types.SET_ZOOM && action.payload) {
        return {...state, zoomFactor: action.payload};
    }

    if (action.type === ClientActions.Types.SET_TARGET && action.payload) {
        return {...state, selectedTarget: action.payload};
    }

    if (action.type === ClientActions.Types.RESET_TARGET) {
        return {...state, selectedTarget: null};
    }

    if (action.type === ClientActions.Types.SET_AMMO && action.payload) {
        return {...state, selectedAmmo: action.payload};
    }

    if (action.type === ClientActions.Types.RESET_AMMO) {
        return {...state, selectedAmmo: null};
    }

    if (action.type === SpaceshipActions.Types.REFRESH && action.payload) {
        const entity = JSON.parse(action.payload);
        return {
            ...state,
            selectedTarget: !existsTrace(entity, state.selectedTarget) ? null : state.selectedTarget,
            selectedAmmo: !existsAmmo(entity, state.selectedAmmo) ? null : state.selectedAmmo
        };
    }

    return state;
};
