import Vector3 from '../models/vector3';

export default interface EntityTrace {
    id: string,
    type: string,
    callSign: string,
    position: Vector3,
    bearing: number,
    distance: number,
    speed: number,
    relativePosition: Vector3,
    relativeBearing: number,
    relativeSide: string,
}
