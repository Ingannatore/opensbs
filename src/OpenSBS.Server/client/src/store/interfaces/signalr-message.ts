export default interface SignalrMessage {
    recipient: string,
    moduleId: string | null,
    command: string | null,
    payload: any | null
}
