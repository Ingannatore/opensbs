import EntityModule from '../entityModule';
import ShieldSector from './shieldSector';

export default interface ShieldModule extends EntityModule {
    isRaised: boolean,
    availableCalibrationPoints: number,
    sectors: ShieldSector[],
}
