import {StateModel} from '../state.model';

const getTarget = (state: StateModel): string | null => {
    return state.client.target;
}

export default {
    getTarget,
}
