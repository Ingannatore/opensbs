import SpaceThing from './space-thing';
import EntityModule from './entity-module';

export default interface Spaceship extends SpaceThing {
    callSign: string,
    modules: Partial<EntityModule>[]
}
