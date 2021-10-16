import EntityTrace from '../../models/entityTrace';
import Item from '../../models/item';
import WeaponModule from './weaponModule';
import WeaponStatus from './weaponStatus';

export default class WeaponService {
    public static getStatus(weapon: WeaponModule): string {
        return `${this.getStatusName(weapon)} | ${this.getTargetName(weapon)}`
    }

    public static getTimerValue(weapon: WeaponModule): string {
        return Math.max(0, Math.ceil(weapon.timer.current)).toString();
    }

    public static isFireButtonEnabled(weapon: WeaponModule, selectedTarget: EntityTrace | null): boolean {
        if (!weapon.magazine.ammoId) {
            return false;
        }

        return weapon.target != null || selectedTarget != null;
    }

    public static isReloadButtonEnabled(weapon: WeaponModule, selectedAmmo: Item | null): boolean {
        if (this.inStatus(weapon, WeaponStatus.IDLE) || this.inStatus(weapon, WeaponStatus.OUT_OF_AMMO)) {
            if (selectedAmmo && weapon.magazine.ammoType === selectedAmmo.type && weapon.magazine.ammoId !== selectedAmmo.id) {
                return true;
            }

            if (weapon.magazine.ammoId && !weapon.magazine.isFull && !this.inStatus(weapon, WeaponStatus.OUT_OF_AMMO)) {
                return true;
            }
        }

        return false;
    }

    public static isUnloadButtonEnabled(weapon: WeaponModule): boolean {
        return this.inStatus(weapon, WeaponStatus.IDLE) && weapon.magazine.quantity > 0;
    }

    public static getAmmoToReload(weapon: WeaponModule, selectedAmmo: Item | null): string | null {
        if (selectedAmmo && weapon.magazine.ammoType === selectedAmmo.type) {
            return selectedAmmo.id;
        }

        return weapon.magazine.ammoId;
    }

    private static inStatus(weapon: WeaponModule, status: string): boolean {
        return weapon.status === status;
    }

    private static getStatusName(weapon: WeaponModule): string {
        switch (weapon.status) {
            case WeaponStatus.IDLE:
                return "Idle";
            case WeaponStatus.FIRE:
                return "Firing";
            case WeaponStatus.OUT_OF_AMMO:
                return "Out of Ammo";
            case WeaponStatus.OUT_OF_RANGE:
                return "Out of Range";
            case WeaponStatus.RELOAD:
                return "Reloading";
            case WeaponStatus.UNLOAD:
                return "Unloading";
            default:
                return weapon.status;
        }
    }

    private static getTargetName(weapon: WeaponModule) {
        return weapon.target?.callSign ?? 'No Target';
    }
}
