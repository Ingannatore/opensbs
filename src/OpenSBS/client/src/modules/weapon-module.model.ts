import EntityModuleModel from '../models/entity-module.model';
import CountdownTimerModel from '../models/countdown-timer.model';
import EntityTraceModel from './entity-trace.model';
import WeaponMagazineModel from '../models/weapon-magazine.model';

export default interface WeaponModuleModel extends EntityModuleModel {
    target: EntityTraceModel | null,
    magazine: WeaponMagazineModel,
    timer: CountdownTimerModel,
    status: string,
}
