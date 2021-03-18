import ActionMetadataModel from './action-metadata.model';

export default interface ActionModel {
    type: string;
    payload: string | null;
    meta: ActionMetadataModel | null;
}
