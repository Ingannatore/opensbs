export interface RadarState {
    radarRange: number,
    enableDirectionLines: boolean,
    enableRangeCircles: boolean,
    enableRangeTexts: boolean,
    enableWeaponsArcs: boolean
}

export const defaultState: RadarState = {
    radarRange: 10000,
    enableDirectionLines: true,
    enableRangeCircles: true,
    enableRangeTexts: true,
    enableWeaponsArcs: false
};
