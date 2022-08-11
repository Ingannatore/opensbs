export default class SvgTransforms {
    public static translate(x: number, y: number): string {
        return x || y ? `translate(${x} ${y})` : '';
    }

    public static scale(value: number): string {
        return `scale(${value})`;
    }

    public static rotate(degrees: number, x: number = 0, y: number = 0): string {
        if (!degrees) {
            return '';
        }

        return x || y ? `rotate(${degrees} ${x} ${y})` : `rotate(${degrees})`;
    }
}
