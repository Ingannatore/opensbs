import {EntityModuleModel} from '../models/entity-module.model';
import {ShieldSectorModel} from './shield-sector.model';

export default interface ShieldModuleModel extends EntityModuleModel {
    isRaised: boolean,
    baseCapacity: number,
    baseRechargeRate: number,
    availableCalibrationPoints: number,
    sectors: ShieldSectorModel[],
}
