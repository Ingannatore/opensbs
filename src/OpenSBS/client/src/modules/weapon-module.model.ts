import {EntityModuleModel} from '../models/entity-module.model';
import CountdownTimerModel from '../models/countdown-timer.model';

export default interface WeaponModuleModel extends EntityModuleModel {
    damage: number,
    range: number,
    rateOfFire: number,
    status: string,
    target: string | null,
    timer: CountdownTimerModel,
}
