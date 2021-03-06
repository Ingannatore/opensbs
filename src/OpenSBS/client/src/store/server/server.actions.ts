﻿import ActionModel from '../action.model';

const Types = {
    START_MISSION: 'server/init',
    PAUSE_MISSION: 'server/pause',
    REFRESH_SERVER_STATE: 'server/refresh'
};

const startMission = (missionId: string, spaceshipId: string, spaceshipName: string, spaceshipCallsign: string): ActionModel => ({
    type: Types.START_MISSION,
    payload: {
        mission: missionId,
        spaceship: spaceshipId,
        name: spaceshipName,
        callsign: spaceshipCallsign,
    },
    meta: {socket: true, entity: null, module: null}
});

const pauseMission = (): ActionModel => ({
    type: Types.PAUSE_MISSION,
    payload: null,
    meta: {socket: true, entity: null, module: null}
});

export default {
    Types,
    startMission,
    pauseMission
};
