export default interface SignalrMessage {
    recipient: string,
    command: string | null,
    payload: any | null
}
