export default class EngineService {
    public static normalizeThrottle(value: number) {
        return Math.max(-100, Math.min(100, Math.round(value)))
    }
}
