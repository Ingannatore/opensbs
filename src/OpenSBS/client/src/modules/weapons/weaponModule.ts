import CountdownTimer from '../../models/countdownTimer';
import EntityModule from '../entityModule';
import EntityTrace from '../../models/entityTrace';
import WeaponMagazine from './weaponMagazine';

export default interface WeaponModule extends EntityModule {
    target: EntityTrace | null,
    magazine: WeaponMagazine,
    timer: CountdownTimer,
    status: string,
}
