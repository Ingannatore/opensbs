import Vector3 from '../../../models/vector3';
import EngineModuleModel from '../../../modules/engine-module.model';

export default interface HelmPropsModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    direction: Vector3,
    engineModule: EngineModuleModel | undefined,
}
