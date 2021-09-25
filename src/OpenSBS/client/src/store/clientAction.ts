import ClientActionMetadata from './clientActionMetadata';

export default interface ClientAction {
    type: string;
    payload: any | null;
    meta: ClientActionMetadata | null;
}
