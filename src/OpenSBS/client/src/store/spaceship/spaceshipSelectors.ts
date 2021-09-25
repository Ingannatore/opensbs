import State from '../state';
import EngineModule from '../../modules/engines/engineModule';
import EntityTrace from '../../models/entityTrace';
import EntityModule from '../../modules/entityModule';
import ItemStorage from '../../models/itemStorage';
import SensorsModule from '../../modules/sensors/sensorsModule';
import ShieldModule from '../../modules/shields/shieldModule';
import Vector3 from '../../models/vector3';
import WeaponModule from '../../modules/weapons/weaponModule';
import ModuleType from '../../modules/moduleType';

const getId = (state: State): string => {
    return state.spaceship.id;
}

const getPosition = (state: State): Vector3 => {
    return state.spaceship?.position ?? {x: 0, y: 0, z: 0};
}

const getDirection = (state: State): Vector3 => {
    return state.spaceship?.direction ?? {x: 0, y: 0, z: 0};
}

const getLinearSpeed = (state: State): number => {
    return state.spaceship?.linearSpeed ?? 0;
}

const getModuleByType = <T extends EntityModule>(state: State, type: string): T | undefined => {
    return state.spaceship.modules.find(
        (module: Partial<EntityModule>) => module.type === type
    ) as T;
}

const getModulesByType = <T extends EntityModule>(state: State, type: string): [T] => {
    return state.spaceship.modules.filter(
        (module: Partial<EntityModule>) => module.type === type
    ) as [T];
}

const getCargo = (state: State): ItemStorage | undefined => {
    return state.spaceship.cargo ?? undefined ;
}

const getSensors = (state: State): SensorsModule | undefined => {
    return getModuleByType<SensorsModule>(state, ModuleType.SENSORS);
}

const getEngine = (state: State): EngineModule | undefined => {
    return getModuleByType<EngineModule>(state, ModuleType.ENGINE);
}

const getShield = (state: State): ShieldModule | undefined => {
    return getModuleByType<ShieldModule>(state, ModuleType.SHIELD);
}

const getWeapon = (state: State, index: number): WeaponModule | undefined => {
    const weapons = getModulesByType<WeaponModule>(state, ModuleType.WEAPON);
    return weapons.length > index ? weapons[index] : undefined
}

const getTraces = (state: State): EntityTrace[] => {
    return getSensors(state)?.traces ?? [];
}

const getTrace = (state: State, id: string): EntityTrace | undefined => {
    const sensors = getModuleByType<SensorsModule>(state, ModuleType.SENSORS);
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
    getCargo,
    getSensors,
    getEngine,
    getShield,
    getWeapon,
    getTraces,
    getTrace,
}
