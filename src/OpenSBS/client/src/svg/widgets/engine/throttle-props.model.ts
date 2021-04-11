export default interface ThrottlePropsModel {
    x: number,
    y: number,
    throttle: number,
    targetSpeed: number,
    onClick: (throttle: number) => void,
}
