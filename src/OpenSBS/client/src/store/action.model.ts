import ActionMetadata from './action-metadata.model';

export default interface Action {
    type: string;
    payload: string | null;
    meta: ActionMetadata | null;
}
