import EntityTraceModel from '../../modules/entity-trace.model';

export default interface ClientStateModel {
    zoomFactor: number,
    selectedTarget: EntityTraceModel | null,
    selectedAmmo: string | null,
}
