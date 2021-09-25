import ClientAction from '../clientAction';
import Entity from '../../models/entity';
import SpaceshipActions from './spaceshipActions';

const defaultState: Entity = {
    id: "",
    type: "",
    name: "",
    callSign: "",
    mass: 0,
    size: 0,
    position: {x: 0, y: 0, z: 0},
    direction: {x: 0, y: 0, z: 0},
    linearSpeed: 0,
    angularSpeed: 0,
    modules: [],
    cargo: null,
};

export default (state = defaultState, action: ClientAction) => {
    if (action.type === SpaceshipActions.Types.REFRESH && action.payload) {
        return {...state, ...JSON.parse(action.payload)};
    }

    return state;
};
