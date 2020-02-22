export const RadarRanges = [10000, 7500, 5000, 2000, 1000];

export interface RadarState {
    zoomLevel: number,
    enableDirectionsOverlay: boolean,
    enableRangesOverlay: boolean,
    enableWeaponsOverlay: boolean,
}

export const defaultState: RadarState = {
    zoomLevel: 0,
    enableDirectionsOverlay: true,
    enableRangesOverlay: true,
    enableWeaponsOverlay: false,
};
