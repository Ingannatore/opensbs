const Types = {
    INCREASE_ZOOM: 'INCREASE_ZOOM',
    DECREASE_ZOOM: 'DECREASE_ZOOM',
};

const increaseZoom = () => ({
    type: Types.INCREASE_ZOOM,
    payload: null
});

const decreaseZoom = () => ({
    type: Types.DECREASE_ZOOM,
    payload: null
});

export default {
    Types,
    increaseZoom,
    decreaseZoom
};
