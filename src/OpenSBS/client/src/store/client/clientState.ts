import EntityTrace from '../../models/entityTrace';

export default interface ClientState {
    zoomFactor: number,
    selectedTarget: EntityTrace | null,
    selectedAmmo: string | null,
}
