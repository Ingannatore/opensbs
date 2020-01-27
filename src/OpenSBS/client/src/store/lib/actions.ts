import Action from '../models/action';

const isSocketAction = (action: Action): boolean => {
    return !!(action.meta?.socket);
};

const hasPayload = (action: Action): boolean => {
    return !!(action.payload);
};

export default {
    isSocketAction,
    hasPayload,
};
