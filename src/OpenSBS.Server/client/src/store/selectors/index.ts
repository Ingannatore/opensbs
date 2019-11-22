import EntityModule from "../models/entity-module";
import Vector3 from "../models/vector3";

const selectRotation = (state: any): Vector3 => {
    if (!state.server.rotation) {
        return {x: 0, y: 0, z: 0};
    }

    return state.server.rotation;
};

const selectModulesByType = (type: string, state: any): Array<Partial<EntityModule>> => {
    if (!state.server.modules) {
        return [];
    }

    return state.server.modules.filter(
        (module: Partial<EntityModule>) => module.type === type
    );
};

const selectModuleById = (id: string, state: any): Partial<EntityModule> | null => {
    if (!state.server.modules) {
        return null;
    }

    return state.server.modules.find(
        (module: Partial<EntityModule>) => module.id === id
    );
};

export default {
    selectRotation,
    selectModulesByType,
    selectModuleById
};
