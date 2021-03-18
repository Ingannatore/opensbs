import {EntityModuleModel} from '../models/entity-module.model';
import {SensorsTraceModel} from './sensors-trace.model';

export interface SensorsModuleModel extends EntityModuleModel {
    range: number,
    traces: SensorsTraceModel[],
}
