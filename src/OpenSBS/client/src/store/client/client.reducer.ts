import ActionModel from '../action.model';
import ClientActions from './client.actions';
import ClientStateModel from './client-state.model';
import {EntityModel} from '../../models/entity.model';
import EntityTraceModel from '../../modules/entity-trace.model';
import SpaceshipActions from '../spaceship/spaceship.actions';
import {EntityModuleModel} from '../../models/entity-module.model';
import {SensorsModuleModel} from '../../modules/sensors-module.model';
import ModuleType from '../../modules/module-type';

const defaultState: ClientStateModel = {
    selectedTarget: null,
    selectedAmmo: null,
};

const existsTrace = (entity: EntityModel, trace: EntityTraceModel): boolean => {
    const sensors = entity.modules.find(
        (module: Partial<EntityModuleModel>) => module.type === ModuleType.SENSORS
    ) as SensorsModuleModel;

    return sensors.traces.find(it => it.id === trace.id) != undefined;
}

export default (state = defaultState, action: ActionModel) => {
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

    if (state.selectedTarget && action.type === SpaceshipActions.Types.REFRESH && action.payload) {
        if (!existsTrace(JSON.parse(action.payload), state.selectedTarget)) {
            return {...state, selectedTarget: null};
        }
    }

    return state;
};
