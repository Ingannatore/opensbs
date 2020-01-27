import Action from '../models/action';
import Actions from './actions';

const invokeMethod = (hub: any, action: Action): Promise<any> => {
    if (Actions.hasPayload(action)) {
        return hub.invoke(
            action.type,
            action.payload
        );
    }

    return hub.invoke(action.type);
};

export default {
    invokeMethod
};
