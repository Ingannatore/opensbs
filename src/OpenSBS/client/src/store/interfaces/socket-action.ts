import ReduxActionMetadata from './redux-action-metadata';

export default interface SocketAction {
    type: string,
    payload: any | null,
    meta: ReduxActionMetadata
}
