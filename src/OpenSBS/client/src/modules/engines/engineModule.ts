import EntityModule from '../entityModule';

export default interface EngineModule extends EntityModule {
    throttle: number,
    rudder: number,
    targetSpeed: number,
}
