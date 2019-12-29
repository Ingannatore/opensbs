export default class SvgTransform {
    public static translate(x: number, y: number): string {
        return x || y ? `translate(${x} ${y})` : '';
    }

    public static rotate(degrees: number, x: number = 0, y: number = 0): string {
        if (degrees === 0) {
            return '';
        }

        return x || y ? `rotate(${degrees} ${x} ${y})` : `rotate(${degrees})`;
    }
}
