import EntityModule from '../../models/entity-module';
import Vector3 from '../../models/vector3';
import Entity from '../../models/entity';
import Coords from '../../lib/coords';

const selectShipPosition = (state: any): Vector3 => {
    const ship = selectPlayersShip(state);
    if (!ship) {
        return {x: 0, y: 0, z: 0};
    }

    return ship.position;
};

const selectShipRotation = (state: any): Vector3 => {
    const ship = selectPlayersShip(state);
    if (!ship) {
        return {x: 0, y: 0, z: 0};
    }

    return ship.rotation;
};

const selectModulesByType = (type: string, state: any): Array<Partial<EntityModule>> => {
    const ship = selectPlayersShip(state);
    if (!ship) {
        return [];
    }

    return ship.modules.filter(
        (module: Partial<EntityModule>) => module.type === type
    );
};

const selectModuleById = (id: string, state: any): Partial<EntityModule> | undefined => {
    const ship = selectPlayersShip(state);
    if (!ship) {
        return undefined;
    }

    return ship.modules.find(
        (module: Partial<EntityModule>) => module.id === id
    );
};

const selectEntitiesByDistance = (state: any, from: Vector3, distance: number): Entity[] => {
    const entities = state.server.entities;
    if (!entities) {
        return [];
    }

    return entities.filter(
        (entity: any) => Coords.distance(from, entity.position) <= distance
    );
};

const selectPlayersShip = (state: any): Entity => state.server.ship;

export default {
    selectShipPosition,
    selectShipRotation,
    selectModulesByType,
    selectModuleById,
    selectEntitiesByDistance
};
