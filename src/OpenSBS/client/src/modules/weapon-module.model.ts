import EntityModuleModel from '../models/entity-module.model';
import CountdownTimerModel from '../models/countdown-timer.model';

export default interface WeaponModuleModel extends EntityModuleModel {
    target: string | null,
    status: string,
    timer: CountdownTimerModel,
}
