const Keys = {
    RANGE: 'radar.range',
    DIRECTIONS_MARKERS: 'radar.directions',
    RANGE_MARKERS: 'RANGE_MARKERS',
    TEXT_MARKERS: 'TEXT_MARKERS',
    WEAPONS_MARKERS: 'WEAPONS_MARKERS'
};

const defaultState = {
    [Keys.RANGE]: 10,
    [Keys.DIRECTIONS_MARKERS]: true,
    [Keys.RANGE_MARKERS]: true,
    [Keys.TEXT_MARKERS]: true,
    [Keys.WEAPONS_MARKERS]: true
};

export default {
    Keys,
    defaultState
};
