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
            default:
                return type;
        }
    }
}
