export default interface SignalrMessage {
    recipient: string,
    moduleId: string | null,
    payload: any | null
}
