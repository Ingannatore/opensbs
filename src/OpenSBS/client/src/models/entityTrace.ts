import Vector3 from '../models/vector3';

export default interface EntityTrace {
    id: string,
    type: string,
    callSign: string,
    position: Vector3,
    distance: number,
    bearing: number,
    relativePosition: Vector3,
    relativeBearing: number,
    relativeSide: string,
}
