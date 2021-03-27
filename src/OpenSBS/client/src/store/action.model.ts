import ActionMetadataModel from './action-metadata.model';

export default interface ActionModel {
    type: string;
    payload: any | null;
    meta: ActionMetadataModel | null;
}
