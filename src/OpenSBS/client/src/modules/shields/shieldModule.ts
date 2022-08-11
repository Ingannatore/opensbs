import EntityModule from 'modules/entityModule';
import ShieldSector from 'modules/shields/shieldSector';

export default interface ShieldModule extends EntityModule {
    isRaised: boolean,
    availableCalibrationPoints: number,
    sectors: ShieldSector[],
}
