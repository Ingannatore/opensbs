import EntityModule from 'modules/entityModule';

export default interface EngineModule extends EntityModule {
    throttle: number,
    rudder: number,
    targetSpeed: number,
}
