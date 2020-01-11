import Vector3 from '../../models/vector3';
import Entity from '../../models/entity';
import Coords from '../../lib/coords';

const selectEntitiesByDistance = (state: any, from: Vector3, distance: number): Entity[] => {
    const entities = state.world.entities;
    if (!entities) {
        return [];
    }

    return entities.filter(
        (entity: any) => Coords.distance(from, entity.position) <= distance
    );
};

export default {
    selectEntitiesByDistance,
};
