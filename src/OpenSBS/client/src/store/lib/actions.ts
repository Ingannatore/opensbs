import Action from '../models/action';
import Response from '../models/response';

const isSocketAction = (action: Action): boolean => {
    return !!(action.meta?.socket);
};

const hasPayload = (action: Action): boolean => {
    return !!(action.payload);
};

const createFromResponse = (response: Response): Action => {
    if (response.payload) {
        return {
            type: response.action,
            payload: response.payload
        };
    }

    return {
        type: response.action
    };
};

export default {
    isSocketAction,
    hasPayload,
    createFromResponse
};
