import Vector3 from '../../models/vector3';
import Spaceship from '../../models/spaceship';
import Thing from '../../models/thing';

const getPlayersShip = (state: any): Spaceship => state.world.ship;

const selectShipId = (state: any): string => {
    const ship = getPlayersShip(state);
    return !ship ? '' : ship.id;
};

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

    return ship.direction;
};

const selectModulesByType = (type: string, state: any): Array<Partial<Thing>> => {
    const ship = getPlayersShip(state);
    if (!ship) {
        return [];
    }

    return ship.modules.filter(
        (module: Partial<Thing>) => module.type === type
    );
};

const selectModuleById = (id: string, state: any): Partial<Thing> | undefined => {
    const ship = getPlayersShip(state);
    if (!ship) {
        return undefined;
    }

    return ship.modules.find(
        (module: Partial<Thing>) => module.id === id
    );
};

export default {
    selectShipId,
    selectShipPosition,
    selectShipRotation,
    selectModulesByType,
    selectModuleById,
};
