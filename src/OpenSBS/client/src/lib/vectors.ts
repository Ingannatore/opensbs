import Vector3 from '../models/vector3';

export default class Vectors {
    public static getYaw(vector: Vector3): number {
        return Math.atan2(-vector.z, vector.x);
    }
}
