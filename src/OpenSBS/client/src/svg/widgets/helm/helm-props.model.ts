import Vector3 from '../../../models/vector3';
import EngineModule from '../../../modules/engines/engineModule';

export default interface HelmPropsModel {
    x: number,
    y: number,
    dispatch: any,
    entityId: string,
    direction: Vector3,
    engineModule: EngineModule | undefined,
}
