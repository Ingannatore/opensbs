import SensorsModule from 'modules/sensors/sensorsModule';
import EntityTrace from 'models/entityTrace';

export default class SensorsService {
    public static getTraces(module: SensorsModule | undefined, distance: number): EntityTrace[] {
        return module?.traces
        .filter((trace: EntityTrace) => trace.spatial.distance <= distance)
        .sort((a: EntityTrace, b: EntityTrace) => a.spatial.distance - b.spatial.distance) ?? [];
    }

    public static getUnscannedTraces(module: SensorsModule | undefined, distance: number): EntityTrace[] {
        if (distance <= 0) return [];

        return module?.traces
            .filter((trace: EntityTrace) => trace.scanLevel <= 0 && trace.spatial.distance <= distance)
            .sort((a: EntityTrace, b: EntityTrace) => a.spatial.distance - b.spatial.distance) ?? [];
    }
}
