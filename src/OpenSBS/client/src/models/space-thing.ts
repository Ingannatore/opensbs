import Thing from './thing';
import Vector3 from './vector3';

export default interface SpaceThing extends Thing {
    description: string,
    position: Vector3,
    direction: Vector3,
    linearSpeed: number,
    angularSpeed: number,
}
