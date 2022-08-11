import ColorPalette from 'svg/colorPalette';

export default class Coloring {
    public static getReputationColor(value: number | null) {
        if (value === null) {
            return ColorPalette.MUTE_LIGHT;
        }
        if (value < 0) {
            return ColorPalette.DANGER;
        }
        if (value > 0) {
            return ColorPalette.SUCCESS;
        }

        return ColorPalette.TEXT
    }
}
