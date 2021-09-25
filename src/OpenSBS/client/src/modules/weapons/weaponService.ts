import EntityTrace from '../../models/entityTrace';
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

    public static isReloadButtonEnabled(weapon: WeaponModule, selectedAmmo: string | null): boolean {
        if (!(weapon.status == WeaponStatus.IDLE || weapon.status == WeaponStatus.OUT_OF_AMMO)) {
            return false;
        }

        if (weapon.status == WeaponStatus.OUT_OF_AMMO && !selectedAmmo) {
            return false;
        }

        if (!selectedAmmo && weapon.magazine.isFull) {
            return false;
        }

        if (selectedAmmo === weapon.magazine.ammoId && weapon.magazine.isFull) {
            return false;
        }

        return weapon.magazine.ammoId != null || selectedAmmo != null;
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
            default:
                return weapon.status;
        }
    }

    private static getTargetName(weapon: WeaponModule) {
        return weapon.target?.callSign ?? 'No Target';
    }
}
