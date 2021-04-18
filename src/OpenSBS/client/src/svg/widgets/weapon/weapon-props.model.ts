import WeaponModuleModel from '../../../modules/weapon-module.model';

export default interface WeaponPropsModel {
    x: number,
    y: number,
    index: number,
    entityId: string,
    weapon: WeaponModuleModel | undefined,
}
