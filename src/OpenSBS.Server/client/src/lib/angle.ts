export default class Angle {
    public static toDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    public static toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}
