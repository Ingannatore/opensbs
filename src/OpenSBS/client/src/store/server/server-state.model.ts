import Mission from './mission.model';

export default interface ServerState {
    isReady: boolean;
    isRunning: boolean;
    lastTick: number;
    lastDeltaT: number;
    missions: Mission[];
}
