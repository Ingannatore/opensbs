import {EntityModuleModel} from '../models/entity-module.model';
import WeaponMagazineModel from './weapon-magazine.model';
import CounterModel from '../models/counter.model';

export default interface WeaponModuleModel extends EntityModuleModel {
    damage: number,
    range: number,
    rateOfFire: number,
    state: string,
    target: string | null,
    isEngaged: boolean,
    magazine: WeaponMagazineModel | null,
    counter: CounterModel,
}
