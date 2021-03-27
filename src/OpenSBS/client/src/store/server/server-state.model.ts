import DataEntryInfoModel from './data-entry-info.model';

export default interface ServerStateModel {
    isReady: boolean;
    isRunning: boolean;
    lastTick: number;
    lastDeltaT: number;
    missions: DataEntryInfoModel[];
    spaceships: DataEntryInfoModel[];
}
