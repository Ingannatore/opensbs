import Action from '../models/action';
import Response from '../models/response';
import Actions from '../lib/actions';
import Signalr from '../lib/signalr';

export default (hub: any) => (store: any) => (next: any) => (action: Action) => {
    if (Actions.isSocketAction(action)) {
        Signalr.invokeMethod(hub, action)
        .then((response?: Response) => {
            if (response) {
                store.dispatch(Actions.createFromResponse(response));
            }
        })
        .catch((err: any) => {
            return console.error(err.toString());
        });
    }

    return next(action);
};
