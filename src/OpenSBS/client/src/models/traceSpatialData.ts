import Vector3 from './vector3';

export default interface TraceSpatialData {
    position: Vector3,
    bearing: number,
    distance: number,
    speed: number,
    size: number,
    relativePosition: Vector3,
    relativeBearing: number,
    relativeSide: string,
}
