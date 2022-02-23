import Vector3 from './vector3';
import Vector2 from './Vector2';

export default interface TraceSpatialData {
    position: Vector3,
    sector: Vector2,
    bearing: number,
    distance: number,
    speed: number,
    size: number,
    relativePosition: Vector3,
    relativeBearing: number,
    relativeSide: string,
}
