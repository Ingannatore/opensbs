import TraceSpatialData from 'models/traceSpatialData';
import TraceShieldData from 'models/traceShieldData';

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
