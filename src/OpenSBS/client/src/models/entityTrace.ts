import TraceSpatialData from './traceSpatialData';
import TraceShieldData from './traceShieldData';

export default interface EntityTrace {
    id: string,
    scanLevel: number,

    type: string,
    callSign: string,
    reputation: number,

    spatial: TraceSpatialData,
    shield: TraceShieldData | null,
}
