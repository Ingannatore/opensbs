export default interface SignalrRequest {
    recipient: string,
    command: string | null,
    payload: any | null
}
