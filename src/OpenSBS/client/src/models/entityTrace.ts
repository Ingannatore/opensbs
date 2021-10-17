import TraceSpatialData from './traceSpatialData';
import TraceShieldData from './traceShieldData';
import TraceStructureData from './traceStructureData';

export default interface EntityTrace {
    id: string,
    scanLevel: number,

    type: string,
    callSign: string,
    reputation: number,

    spatial: TraceSpatialData,
    structure: TraceStructureData,
    shield: TraceShieldData | null,
}
