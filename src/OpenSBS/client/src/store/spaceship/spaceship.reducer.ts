import {EntityModel} from '../../models/entity.model';
import ActionModel from '../action.model';
import SpaceshipActions from './spaceship.actions';

const defaultState: EntityModel = {
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
    modules: []
};

export default (state = defaultState, action: ActionModel) => {
    if (action.type === SpaceshipActions.Types.REFRESH && action.payload) {
        return {...state, ...JSON.parse(action.payload)};
    }

    return state;
};

