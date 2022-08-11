import {createSlice} from '@reduxjs/toolkit'
import ClientState from "./clientState";
import Entity from "../../models/entity";
import EntityTrace from "../../models/entityTrace";
import EntityModule from "../../modules/entityModule";
import ModuleType from "../../modules/moduleType";
import SensorsModule from "../../modules/sensors/sensorsModule";
import Item from "../../models/item";

const initialState: ClientState = {
    radarScale: 1,
    selectedTarget: null,
    selectedAmmo: null,
    selectedSector: {x: 0, y: 0},
};

const findTrace = (entity: Entity, trace: EntityTrace | null): EntityTrace | null => {
    if (!trace) {
        return null;
    }

    const sensors = entity.modules.find(
        (module: Partial<EntityModule>) => module.type === ModuleType.SENSORS
    ) as SensorsModule;

    return sensors.traces.find(it => it.id === trace.id) ?? null;
}

const existsAmmo = (entity: Entity, ammo: Item | null): boolean => {
    if (!ammo) {
        return false;
    }

    return entity.cargo?.items.find(it => it.item.id === ammo.id) !== undefined ?? false;
}

const clientSlice = createSlice({
    name: 'client',
    initialState: initialState,
    reducers: {
        setRadarScale(state, action) {
            return {...state, radarScale: action.payload};
        },
        selectTarget(state, action) {
            return {...state, selectedTarget: action.payload};
        },
        resetTarget(state) {
            return {...state, selectedTarget: null};
        },
        selectAmmo(state, action) {
            return {...state, selectedAmmo: action.payload};
        },
        resetAmmo(state) {
            return {...state, selectedAmmo: null};
        },
        selectSector(state, action) {
            return {...state, selectedSector: action.payload};
        },
        refresh(state, action) {
            const entity = JSON.parse(action.payload);
            return {
                ...state,
                selectedTarget: findTrace(entity, state.selectedTarget),
                selectedAmmo: existsAmmo(entity, state.selectedAmmo) ? state.selectedAmmo : null
            };
        },
    }
});

export const {
    setRadarScale,
    selectTarget,
    resetTarget,
    selectAmmo,
    resetAmmo,
    selectSector,
    refresh,
} = clientSlice.actions
export default clientSlice.reducer
