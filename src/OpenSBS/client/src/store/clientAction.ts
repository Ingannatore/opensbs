import ClientActionMetadata from 'store/clientActionMetadata';

export default interface ClientAction {
    type: string;
    payload: any | null;
    meta: ClientActionMetadata | null;
}
