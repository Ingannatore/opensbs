import Action from '../../../store/models/action';

const Types = {
    TOGGLE_DIRECTIONS_OVERLAY: 'TOGGLE_DIRECTIONS_OVERLAY',
    TOGGLE_RANGES_OVERLAY: 'TOGGLE_RANGES_OVERLAY',
    TOGGLE_WEAPONS_OVERLAY: 'TOGGLE_WEAPONS_OVERLAY',
    ZOOM_IN: 'ZOOM_IN',
    ZOOM_OUT: 'ZOOM_OUT',
};

const toggleDirectionsOverlay = (): Action => ({
    type: Types.TOGGLE_DIRECTIONS_OVERLAY
});

const toggleRangesOverlay = (): Action => ({
    type: Types.TOGGLE_RANGES_OVERLAY
});

const toggleWeaponsOverlay = (): Action => ({
    type: Types.TOGGLE_WEAPONS_OVERLAY
});

const zoomIn = (): Action => ({
    type: Types.ZOOM_IN
});

const zoomOut = (): Action => ({
    type: Types.ZOOM_OUT
});

export default {
    Types,
    toggleDirectionsOverlay,
    toggleRangesOverlay,
    toggleWeaponsOverlay,
    zoomIn,
    zoomOut,
};
