import Action from '../../store/models/action';

const Types = {
    TOGGLE_DIRECTION_LINES: 'TOGGLE_DIRECTION_LINES',
    TOGGLE_RANGE_CIRCLES: 'TOGGLE_RANGE_CIRCLES',
    TOGGLE_RANGE_TEXTS: 'TOGGLE_RANGE_TEXTS',
    TOGGLE_WEAPONS_ARCS: 'TOGGLE_WEAPONS_ARCS',
    ZOOM_IN: 'ZOOM_IN',
    ZOOM_OUT: 'ZOOM_OUT'
};

const toggleDirectionsLines = (): Action => ({
    type: Types.TOGGLE_DIRECTION_LINES
});

const toggleRangeCircles = (): Action => ({
    type: Types.TOGGLE_RANGE_CIRCLES
});

const toggleRangeTexts = (): Action => ({
    type: Types.TOGGLE_RANGE_TEXTS
});

const toggleWeaponsArcs = (): Action => ({
    type: Types.TOGGLE_WEAPONS_ARCS
});

const zoomIn = (): Action => ({
    type: Types.ZOOM_IN
});

const zoomOut = (): Action => ({
    type: Types.ZOOM_OUT
});

export default {
    Types,
    toggleDirectionsLines,
    toggleRangeCircles,
    toggleRangeTexts,
    toggleWeaponsArcs,
    zoomIn,
    zoomOut
};
