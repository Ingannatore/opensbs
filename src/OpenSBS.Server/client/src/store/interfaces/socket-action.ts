import SocketActionMetadata from './socket-action-metadata';

export default interface SocketAction {
    type: string,
    payload: any | null,
    meta: SocketActionMetadata
}
