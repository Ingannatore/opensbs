import Vector3 from 'models/vector3';

export default class Coords {
    public static distance(pointA: Vector3, pointB: Vector3): number {
        const dx = pointB.x - pointA.x;
        const dy = pointB.y - pointA.y;
        const dz = pointB.z - pointA.z;

        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
    }

    public static translate(point: Vector3, origin: Vector3): Vector3 {
        return {
            x: point.x - origin.x,
            y: point.y - origin.y,
            z: point.z - origin.z
        };
    }

    public static scale(point: Vector3, factor: number): Vector3 {
        return {
            x: point.x * factor,
            y: point.y * factor,
            z: point.z * factor
        };
    }
}
