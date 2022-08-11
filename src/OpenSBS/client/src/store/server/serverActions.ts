import ClientAction from 'store/clientAction';

const serverActionTypes = {
    START_MISSION: 'server/init',
    PAUSE_MISSION: 'server/pause',
};

const startMission = (missionId: string, spaceshipId: string, spaceshipName: string, spaceshipCallsign: string): ClientAction => ({
    type: serverActionTypes.START_MISSION,
    payload: {
        mission: missionId,
        spaceship: spaceshipId,
        name: spaceshipName,
        callsign: spaceshipCallsign,
    },
    meta: {socket: true, entity: null, module: null}
});

const pauseMission = (): ClientAction => ({
    type: serverActionTypes.PAUSE_MISSION,
    payload: null,
    meta: {socket: true, entity: null, module: null}
});

const serverActions = {
    startMission,
    pauseMission
};

export default serverActions;
