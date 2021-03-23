export default class Angles {
    public static toDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    public static toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    public static normalize(degrees: number): number {
        return degrees < 0 ? 360 + degrees : degrees;
    }
}
