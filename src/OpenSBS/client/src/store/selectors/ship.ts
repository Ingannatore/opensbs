import EntityModule from '../../models/entity-module';
import Vector3 from '../../models/vector3';
import Entity from '../../models/entity';

const getPlayersShip = (state: any): Entity => state.world.ship;

const selectShipPosition = (state: any): Vector3 => {
    const ship = getPlayersShip(state);
    if (!ship) {
        return {x: 0, y: 0, z: 0};
    }

    return ship.position;
};

const selectShipRotation = (state: any): Vector3 => {
    const ship = getPlayersShip(state);
    if (!ship) {
        return {x: 0, y: 0, z: 0};
    }

    return ship.rotation;
};

const selectModulesByType = (type: string, state: any): Array<Partial<EntityModule>> => {
    const ship = getPlayersShip(state);
    if (!ship) {
        return [];
    }

    return ship.modules.filter(
        (module: Partial<EntityModule>) => module.type === type
    );
};

const selectModuleById = (id: string, state: any): Partial<EntityModule> | undefined => {
    const ship = getPlayersShip(state);
    if (!ship) {
        return undefined;
    }

    return ship.modules.find(
        (module: Partial<EntityModule>) => module.id === id
    );
};

export default {
    selectShipPosition,
    selectShipRotation,
    selectModulesByType,
    selectModuleById,
};
