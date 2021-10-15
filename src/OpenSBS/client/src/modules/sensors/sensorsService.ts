import SensorsModule from './sensorsModule';
import EntityTrace from '../../models/entityTrace';

export default class SensorsService {
    public static getTraces(module: SensorsModule | undefined, distance: number): EntityTrace[] {
        return module?.traces
        .filter((trace: EntityTrace) => trace.distance <= distance)
        .sort((a: EntityTrace, b: EntityTrace) => a.distance - b.distance) ?? [];
    }
}
