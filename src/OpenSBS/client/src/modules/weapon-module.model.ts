import EntityModuleModel from '../models/entity-module.model';
import CountdownTimerModel from '../models/countdown-timer.model';
import EntityTraceModel from './entity-trace.model';

export default interface WeaponModuleModel extends EntityModuleModel {
    target: EntityTraceModel | null,
    status: string,
    timer: CountdownTimerModel,
}
