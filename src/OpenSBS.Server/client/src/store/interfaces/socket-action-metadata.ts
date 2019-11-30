export default interface ReduxActionMetadata {
    socket: boolean,
    method: string,
    empty: boolean,
    path: string,
    module: string | null
}
