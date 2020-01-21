import ActionMetadata from './action-metadata';

export default interface Action {
    type: string,
    payload?: any,
    meta?: ActionMetadata
}
