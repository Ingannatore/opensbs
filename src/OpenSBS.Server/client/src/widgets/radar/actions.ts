import ReduxAction from "../../store/models/redux-action";

const Types = {
    TOGGLE_DIRECTION_LINES: 'TOGGLE_DIRECTION_LINES',
    TOGGLE_RANGE_CIRCLES: 'TOGGLE_RANGE_CIRCLES',
    TOGGLE_RANGE_TEXTS: 'TOGGLE_RANGE_TEXTS',
    TOGGLE_WEAPONS_ARCS: 'TOGGLE_WEAPONS_ARCS',
    ZOOM_IN: 'ZOOM_IN',
    ZOOM_OUT: 'ZOOM_OUT'
};

const toggleDirectionsLines = (): ReduxAction => ({
    type: Types.TOGGLE_DIRECTION_LINES,
    payload: null,
    meta: null
});

const toggleRangeCircles = (): ReduxAction => ({
    type: Types.TOGGLE_RANGE_CIRCLES,
    payload: null,
    meta: null
});

const toggleRangeTexts = (): ReduxAction => ({
    type: Types.TOGGLE_RANGE_TEXTS,
    payload: null,
    meta: null
});

const toggleWeaponsArcs = (): ReduxAction => ({
    type: Types.TOGGLE_WEAPONS_ARCS,
    payload: null,
    meta: null
});

const zoomIn = (): ReduxAction => ({
    type: Types.ZOOM_IN,
    payload: null,
    meta: null
});

const zoomOut = (): ReduxAction => ({
    type: Types.ZOOM_OUT,
    payload: null,
    meta: null
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
