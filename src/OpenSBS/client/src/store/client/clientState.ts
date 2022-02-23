import EntityTrace from '../../models/entityTrace';
import Item from '../../models/item';
import Vector2 from '../../models/Vector2';

export default interface ClientState {
    radarScale: number,
    selectedTarget: EntityTrace | null,
    selectedAmmo: Item | null,
    selectedSector: Vector2,
}
