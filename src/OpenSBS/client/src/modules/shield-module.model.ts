import EntityModuleModel from '../models/entity-module.model';
import {ShieldSectorModel} from './shield-sector.model';

export default interface ShieldModuleModel extends EntityModuleModel {
    isRaised: boolean,
    availableCalibrationPoints: number,
    sectors: ShieldSectorModel[],
}
