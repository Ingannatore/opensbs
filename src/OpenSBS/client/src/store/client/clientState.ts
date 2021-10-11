import EntityTrace from '../../models/entityTrace';
import Item from '../../models/item';
import Vector3 from '../../models/vector3';

export default interface ClientState {
    radarScale: number,
    mapGridVisible: boolean,
    mapScale: number,
    mapCenter: Vector3,
    selectedTarget: EntityTrace | null,
    selectedAmmo: Item | null,
}
