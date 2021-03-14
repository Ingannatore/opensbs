import ActionMetadata from './action-metadata.model';

export default interface Action {
    type: string;
    payload: any | null;
    meta: ActionMetadata | null;
}
