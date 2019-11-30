import Vector3 from '../models/vector3';

export default class Coords {
    public static toCarthesian(r: number, theta: number): Vector3 {
        return {
            x: r * Math.cos(theta),
            y: r * Math.sin(theta),
            z: 0
        };
    }
}
