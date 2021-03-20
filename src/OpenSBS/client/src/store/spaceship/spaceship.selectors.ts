import {StateModel} from '../state.model';
import Vector3 from '../../models/vector3';
import {EntityModuleModel} from '../../models/entity-module.model';

const getId = (state: StateModel): string => {
    return state.spaceship.id;
}

const getPosition = (state: StateModel): Vector3 => {
    return state.spaceship.position;
}

const getBearing = (state: StateModel): number => {
    return state.spaceship.bearing;
}

const getModuleByType = (state: StateModel, type: string): Partial<EntityModuleModel> | undefined => {
    return state.spaceship.modules.find(
        (module: Partial<EntityModuleModel>) => module.type === type
    );
}

export default {
    getId,
    getPosition,
    getBearing,
    getModuleByType,
}
