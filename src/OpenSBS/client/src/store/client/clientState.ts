import EntityTrace from '../../models/entityTrace';
import Item from '../../models/item';

export default interface ClientState {
    radarScale: number,
    mapScale: number,
    selectedTarget: EntityTrace | null,
    selectedAmmo: Item | null,
}
