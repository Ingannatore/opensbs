import DataEntryInfo from '../../models/dataEntryInfo';

export default interface ServerState {
    isReady: boolean;
    isRunning: boolean;
    lastTick: number;
    lastDeltaT: number;
    missions: DataEntryInfo[];
    spaceships: DataEntryInfo[];
}
