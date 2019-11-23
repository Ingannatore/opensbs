export interface RadarState {
    enableDirectionLines: boolean,
    enableRangeCircles: boolean,
    enableRangeTexts: boolean,
    enableWeaponsArcs: boolean
}

export const defaultState: RadarState = {
    enableDirectionLines: true,
    enableRangeCircles: true,
    enableRangeTexts: true,
    enableWeaponsArcs: false
};
