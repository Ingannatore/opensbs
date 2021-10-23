import TraceSpatialData from './traceSpatialData';
import TraceShieldData from './traceShieldData';

export default interface EntityTrace {
    id: string,
    scanLevel: number,

    type: string,
    callSign: string,
    reputation: number | null,

    spatial: TraceSpatialData,
    shield: TraceShieldData | null,
}
