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

const invokeHubMethod = (hub: any, action: Action): Promise<any> => {
    if (hasPayload(action)) {
        return hub.invoke(
            action.type,
            action.payload
        );
    }

    return hub.invoke(action.type);
};

export default (hub: any) => (store: any) => (next: any) => (action: Action) => {
    if (isSocketAction(action)) {
        invokeHubMethod(hub, action)
        .then((response?: Response) => {
            if (response) {
                store.dispatch(createFromResponse(response));
            }
        })
        .catch((err: any) => {
            return console.error(err.toString());
        });
    }

    return next(action);
};
