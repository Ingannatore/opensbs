import EngineModule from '../../../modules/engines/engineModule';

export default interface EnginePropsModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    linearSpeed: number,
    engineModule: EngineModule | undefined,
}
