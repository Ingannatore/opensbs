import WeaponModuleModel from '../../../modules/weapon-module.model';

export default interface WeaponPropsModel {
    x: number,
    y: number,
    dispatch: any,
    index: number,
    entityId: string,
    weapon: WeaponModuleModel | undefined,
    target: string | null,
}
