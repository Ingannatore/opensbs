import {StateModel} from '../state.model';
import Vector3 from '../../models/vector3';
import {EntityModuleModel} from '../../models/entity-module.model';
import WeaponModuleModel from '../../modules/weapon-module.model';
import {SensorsTraceModel} from '../../modules/sensors-trace.model';
import {SensorsModuleModel} from '../../modules/sensors-module.model';

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

const getModulesByType = <T extends EntityModuleModel>(state: StateModel, type: string): [T] => {
    return state.spaceship.modules.filter(
        (module: Partial<EntityModuleModel>) => module.type === type
    ) as [T];
}

const getWeapon = (state: StateModel, index: number): WeaponModuleModel | undefined => {
    const weapons = getModulesByType<WeaponModuleModel>(state, 'module.weapon');
    return weapons.length > index ? weapons[index] : undefined
}

const getTrace = (state: StateModel, id: string): SensorsTraceModel | undefined => {
    const sensors = getModuleByType<SensorsModuleModel>(state, 'module.sensors');
    if (!sensors) {
        return undefined;
    }

    return sensors.traces.find((trace) => trace.id === id);
}

export default {
    getId,
    getPosition,
    getDirection,
    getLinearSpeed,
    getModuleByType,
    getModulesByType,
    getWeapon,
    getTrace,
}
