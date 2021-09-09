import Vector3 from '../models/vector3';

export interface SensorsTraceModel {
    id: string,
    type: string,
    callSign: string,
    position: Vector3,
    distance: number,
    relativePosition: Vector3,
    relativeDirection: Vector3,
}
