import {SensorsModuleModel} from '../../../modules/sensors-module.model';

export default interface TargetsPropsModel {
    x: number,
    y: number,
    dispatch: any,
    target: string | null,
    sensorsModule: SensorsModuleModel | undefined,
}
