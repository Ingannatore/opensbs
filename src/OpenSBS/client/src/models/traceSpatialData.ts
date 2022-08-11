import Vector3 from 'models/vector3';
import Vector2 from 'models/vector2';

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
