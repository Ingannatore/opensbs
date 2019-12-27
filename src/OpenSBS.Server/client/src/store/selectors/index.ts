import EntityModule from '../../models/entity-module';
import Vector3 from '../../models/vector3';

const selectRotation = (state: any): Vector3 => {
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

const selectModuleById = (id: string, state: any): Partial<EntityModule> | null => {
    const ship = selectPlayersShip(state);
    if (!ship) {
        return null;
    }

    return ship.modules.find(
        (module: Partial<EntityModule>) => module.id === id
    );
};

const selectPlayersShip = (state: any) => state.server.ship;

export default {
    selectRotation,
    selectModulesByType,
    selectModuleById
};
