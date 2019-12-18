export default interface ReduxActionMetadata {
    socket: boolean,
    method: string,
    empty: boolean,
    recipient: string,
    command: string | null
}
