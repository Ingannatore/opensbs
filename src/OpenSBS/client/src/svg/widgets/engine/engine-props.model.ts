import EngineModuleModel from '../../../modules/engine-module.model';

export default interface EnginePropsModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    linearSpeed: number,
    engineModule: EngineModuleModel | undefined,
}
