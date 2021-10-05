import SensorsModule from './sensorsModule';
import EntityTrace from '../../models/entityTrace';

export default class SensorsService {
    public static findNearestTraces(module: SensorsModule | undefined, limit = 10): EntityTrace[] {
        return module?.traces
        .sort((a: EntityTrace, b: EntityTrace) => a.distance - b.distance)
        .slice(0, limit) ?? [];
    }

    public static findTraces(module: SensorsModule | undefined, distance: number): EntityTrace[] {
        return module?.traces
        .filter((trace: EntityTrace) => trace.distance <= distance) ?? [];
    }
}
