export default class Naming {
    public static getEntityTypeName(type: string): string {
        switch (type) {
            case 'entity.spaceship.fighter':
                return 'Fighter';
            case 'entity.spaceship.frigate':
                return 'Frigate';
            case 'entity.spaceship.cruiser':
                return 'Cruiser';
            case 'entity.spaceship.battlecruiser':
                return 'BattleCruiser';
            case 'entity.spaceship.dreadnought':
                return 'Dreadnought';
            case 'entity.spaceship.carrier':
                return 'Carrier';
            case 'entity.spaceship.station':
                return 'Station';
            case 'entity.spaceship.freighter':
                return 'Freighter';
            case 'entity.container':
                return 'Container';
            case 'entity.wreck':
                return 'Wreck';
            case 'entity.unknown':
                return 'Unknown';
            default:
                return type;
        }
    }

    public static getReputationName(value: number | null): string {
        if (!value) {
            return 'UNKNOWN';
        }

        if (value > 0) {
            return 'FRIEND';
        }
        if (value < 0) {
            return 'ENEMY';
        }

        return 'NEUTRAL';
    }
}
