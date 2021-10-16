import * as React from 'react';
import {connect} from 'react-redux';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import TraceElement from '../../elements/traceElement';
import ClientSelectors from '../../../store/client/clientSelectors';
import ClientActions from '../../../store/client/clientActions';
import Coords from '../../../lib/coords';

interface TracesOverlayProps {
    x: number,
    y: number,
    r: number,
    scale: number,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

class TracesOverlay extends React.Component<TracesOverlayProps, {}> {
    private readonly translation: string;

    constructor(props: TracesOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const scale = this.props.r / (this.props.sensors.range * this.props.scale);
        const traces = this.props.sensors.traces.map(
            (trace: EntityTrace) => this.renderTrace(trace, scale)
        );

        return (
            <g transform={this.translation} mask="url(#scannerMask)">
                {traces}
            </g>
        );
    }

    private renderTrace(trace: EntityTrace, scale: number) {
        const position = Coords.scale(trace.spatial.relativePosition, scale);
        return (
            <TraceElement
                key={'scanner-trace-' + trace.id}
                x={position.x}
                y={-position.z}
                trace={trace}
                selected={trace.id === this.props.target?.id}
                onClick={this.onTraceClick}
            />
        );
    }

    private onTraceClick(trace: EntityTrace) {
        if (trace.id === this.props.target?.id) {
            this.props.dispatch(ClientActions.resetTarget());
        } else {
            this.props.dispatch(ClientActions.setTarget(trace));
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(TracesOverlay);
