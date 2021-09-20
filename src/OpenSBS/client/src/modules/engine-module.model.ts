import EntityModuleModel from '../models/entity-module.model';

export default interface EngineModuleModel extends EntityModuleModel {
    throttle: number,
    rudder: number,
    targetSpeed: number,
}
