import Mission from './mission.model';

export default interface ServerStateModel {
    isReady: boolean;
    isRunning: boolean;
    lastTick: number;
    lastDeltaT: number;
    missions: Mission[];
}
