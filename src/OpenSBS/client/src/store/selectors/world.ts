import Coords from '../../lib/coords';
import Vector3 from '../../models/vector3';
import Spaceship from '../../models/spaceship';

const selectEntitiesByDistance = (state: any, from: Vector3, distance: number): Spaceship[] => {
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
