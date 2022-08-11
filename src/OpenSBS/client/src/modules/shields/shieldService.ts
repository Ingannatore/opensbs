import EntitySide from 'models/entitySide';
import ShieldSector from 'modules/shields/shieldSector';
import ShieldModule from 'modules/shields/shieldModule';

export default class ShieldService {
    public static findSector(module: ShieldModule | undefined, side: string): ShieldSector | undefined {
        return module?.sectors.find((item: ShieldSector) => item.side === side);
    }

    public static getSectorName(sector: ShieldSector): string {
        switch (sector.side) {
            case EntitySide.FRONT:
                return "FRONT";
            case EntitySide.RIGHT:
                return "RIGHT";
            case EntitySide.REAR:
                return "REAR";
            case EntitySide.LEFT:
                return "LEFT";
            default:
                return "";
        }
    }
}
