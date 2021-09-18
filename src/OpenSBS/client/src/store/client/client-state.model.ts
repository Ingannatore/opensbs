import EntityTraceModel from '../../modules/entity-trace.model';

export default interface ClientStateModel {
    selectedTarget: EntityTraceModel | null,
    selectedAmmo: string | null,
}
