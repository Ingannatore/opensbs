import ClientAction from '../clientAction';
import ClientActions from './clientActions';
import ClientState from './clientState';
import Entity from '../../models/entity';
import EntityModule from '../../modules/entityModule';
import EntityTrace from '../../models/entityTrace';
import SensorsModule from '../../modules/sensors/sensorsModule';
import SpaceshipActions from '../spaceship/spaceshipActions';
import Item from '../../models/item';
import ModuleType from '../../modules/moduleType';

const defaultState: ClientState = {
    radarScale: 1,
    selectedTarget: null,
    selectedAmmo: null,
};

const findTrace = (entity: Entity, trace: EntityTrace | null): EntityTrace | null => {
    if (!trace) {
        return null;
    }

    const sensors = entity.modules.find(
        (module: Partial<EntityModule>) => module.type === ModuleType.SENSORS
    ) as SensorsModule;

    return sensors.traces.find(it => it.id === trace.id) ?? null;
}

const existsAmmo = (entity: Entity, ammo: Item | null): boolean => {
    if (!ammo) {
        return false;
    }

    return entity.cargo?.items.find(it => it.item.id === ammo.id) !== undefined ?? false;
}

export default (state = defaultState, action: ClientAction) => {
    if (action.type === ClientActions.Types.SET_RADAR_SCALE && action.payload) {
        return {...state, radarScale: action.payload};
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
            selectedTarget: findTrace(entity, state.selectedTarget),
            selectedAmmo: existsAmmo(entity, state.selectedAmmo) ? state.selectedAmmo : null
        };
    }

    return state;
};
