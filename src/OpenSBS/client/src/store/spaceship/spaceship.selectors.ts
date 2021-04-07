import {StateModel} from '../state.model';
import Vector3 from '../../models/vector3';
import {EntityModuleModel} from '../../models/entity-module.model';

const getId = (state: StateModel): string => {
    return state.spaceship.id;
}

const getPosition = (state: StateModel): Vector3 => {
    return state.spaceship?.position ?? {x: 0, y: 0, z: 0};
}

const getDirection = (state: StateModel): Vector3 => {
    return state.spaceship?.direction ?? {x: 0, y: 0, z: 0};
}

const getLinearSpeed = (state: StateModel): number => {
    return state.spaceship?.linearSpeed ?? 0;
}

const getModuleByType = <T extends EntityModuleModel>(state: StateModel, type: string): T | undefined => {
    return state.spaceship.modules.find(
        (module: Partial<EntityModuleModel>) => module.type === type
    ) as T;
}

export default {
    getId,
    getPosition,
    getDirection,
    getLinearSpeed,
    getModuleByType,
}
