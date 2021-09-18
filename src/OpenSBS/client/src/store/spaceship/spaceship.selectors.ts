import {StateModel} from '../state.model';
import Vector3 from '../../models/vector3';
import {EntityModuleModel} from '../../models/entity-module.model';
import WeaponModuleModel from '../../modules/weapon-module.model';
import EntityTraceModel from '../../modules/entity-trace.model';
import {SensorsModuleModel} from '../../modules/sensors-module.model';
import EngineModuleModel from '../../modules/engine-module.model';
import ShieldModuleModel from '../../modules/shield-module.model';
import ItemStorageModel from '../../models/item-storage.model';
import ModuleType from '../../modules/module-type';

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

const getCargo = (state: StateModel): ItemStorageModel | undefined => {
    return state.spaceship.cargo ?? undefined ;
}

const getSensors = (state: StateModel): SensorsModuleModel | undefined => {
    return getModuleByType<SensorsModuleModel>(state, ModuleType.SENSORS);
}

const getEngine = (state: StateModel): EngineModuleModel | undefined => {
    return getModuleByType<EngineModuleModel>(state, ModuleType.ENGINE);
}

const getShield = (state: StateModel): ShieldModuleModel | undefined => {
    return getModuleByType<ShieldModuleModel>(state, ModuleType.SHIELD);
}

const getWeapon = (state: StateModel, index: number): WeaponModuleModel | undefined => {
    const weapons = getModulesByType<WeaponModuleModel>(state, ModuleType.WEAPON);
    return weapons.length > index ? weapons[index] : undefined
}

const getTrace = (state: StateModel, id: string): EntityTraceModel | undefined => {
    const sensors = getModuleByType<SensorsModuleModel>(state, ModuleType.SENSORS);
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
    getTrace,
}
