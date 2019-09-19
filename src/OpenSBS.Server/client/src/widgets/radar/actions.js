const Types = {
    INCREASE_ZOOM: 'INCREASE_ZOOM',
    DECREASE_ZOOM: 'DECREASE_ZOOM',
    TOGGLE_DIRECTIONS: 'TOGGLE_DIRECTIONS',
    TOGGLE_RANGES: 'TOGGLE_RANGES',
    TOGGLE_TEXTS: 'TOGGLE_TEXTS',
    TOGGLE_WEAPONS: 'TOGGLE_WEAPONS',
};

const increaseZoom = () => ({
    type: Types.INCREASE_ZOOM,
    payload: null
});

const decreaseZoom = () => ({
    type: Types.DECREASE_ZOOM,
    payload: null
});

const toggleDirectionsMarkers = () => ({
    type: Types.TOGGLE_DIRECTIONS,
    payload: null
});

const toggleRangeMarkers = () => ({
    type: Types.TOGGLE_RANGES,
    payload: null
});

const toggleTextMarkers = () => ({
    type: Types.TOGGLE_TEXTS,
    payload: null
});

const toggleWeaponsMarkers = () => ({
    type: Types.TOGGLE_WEAPONS,
    payload: null
});

export default {
    Types,
    increaseZoom,
    decreaseZoom,
    toggleDirectionsMarkers,
    toggleRangeMarkers,
    toggleTextMarkers,
    toggleWeaponsMarkers
};
