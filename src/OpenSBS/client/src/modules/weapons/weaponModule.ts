import CountdownTimer from 'models/countdownTimer';
import EntityTrace from 'models/entityTrace';
import EntityModule from 'modules/entityModule';
import WeaponMagazine from 'modules/weapons/weaponMagazine';

export default interface WeaponModule extends EntityModule {
    target: EntityTrace | null,
    magazine: WeaponMagazine,
    timer: CountdownTimer,
    status: string,
    firingArcs: string[],
}
