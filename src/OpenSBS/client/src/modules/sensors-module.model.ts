import EntityModuleModel from '../models/entity-module.model';
import EntityTraceModel from './entity-trace.model';

export interface SensorsModuleModel extends EntityModuleModel {
    traces: EntityTraceModel[],
}
