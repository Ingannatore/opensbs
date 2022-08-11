import EntityModule from 'modules/entityModule';
import EntityTrace from 'models/entityTrace';

export default interface SensorsModule extends EntityModule {
    traces: EntityTrace[],
    range: number,
}
