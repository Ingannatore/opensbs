import Vector3 from '../models/vector3';

export default class Coords {
    public static toCarthesian(r: number, theta: number): Vector3 {
        return {
            x: r * Math.cos(theta),
            y: r * Math.sin(theta),
            z: 0
        };
    }

    public static distance(from: Vector3, to: Vector3): number {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dz = to.z - from.z;

        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
    }
}
