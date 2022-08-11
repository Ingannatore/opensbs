import TraceSpatialData from './traceSpatialData';
import TraceShieldData from './traceShieldData';

export default interface EntityTrace {
    id: string,
    scanLevel: number,
    signature: string[][],

    type: string,
    callSign: string,
    reputation: number | null,

    spatial: TraceSpatialData,
    shield: TraceShieldData | null,
}
