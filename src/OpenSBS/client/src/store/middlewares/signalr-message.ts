import Action from '../models/action';
import Actions from '../lib/actions';
import Signalr from '../lib/signalr';

export default (hub: any) => (store: any) => (next: any) => (action: Action) => {
    if (Actions.isSocketAction(action)) {
        Signalr.invokeMethod(hub, action)
        .then((action?: Action) => {
            if (action) {
                store.dispatch(action);
            }
        })
        .catch((err: any) => {
            return console.error(err.toString());
        });
    }

    return next(action);
};
