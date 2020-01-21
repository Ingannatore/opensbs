import Action from '../interfaces/action';
import Response from '../interfaces/response';

const isSignalrMessage = (action: Action): boolean => {
    return action.hasOwnProperty('meta') && action.meta!.socket;
};

const invokeHubMethod = (hub: any, action: Action): Promise<any> => {
    if (action.hasOwnProperty('payload')) {
        return hub.invoke(
            action.type,
            action.payload
        );
    }

    return hub.invoke(action.type);
};

const createActionFromResponse = (response: Response): Action => {
    const result: Action = {
        type: response.action
    };

    if (response.payload) {
        result.payload = response.payload
    }

    return result;
};

export default (hub: any) => (store: any) => (next: any) => (action: Action) => {
    if (isSignalrMessage(action)) {
        invokeHubMethod(hub, action)
        .then((response?: Response) => {
            if (response) {
                store.dispatch(createActionFromResponse(response));
            }
        })
        .catch((err: any) => {
            return console.error(err.toString());
        });
    }

    return next(action);
};
