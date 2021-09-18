import {EntityModuleModel} from '../models/entity-module.model';
import ModuleTimerModel from '../models/module-timer.model';

export default interface WeaponModuleModel extends EntityModuleModel {
    damage: number,
    range: number,
    rateOfFire: number,
    state: string,
    target: string | null,
    timer: ModuleTimerModel,
}
