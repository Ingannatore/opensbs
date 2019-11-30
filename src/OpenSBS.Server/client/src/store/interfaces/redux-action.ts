import ReduxActionMetadata from './socket-action-metadata';

export default interface ReduxAction {
    type: string,
    payload: any | null,
    meta: ReduxActionMetadata | null
}
