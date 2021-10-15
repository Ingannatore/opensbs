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
import SensorsService from '../../../modules/sensors/sensorsService';

interface TracesOverlayProps {
    x: number,
    y: number,
    r: number,
    scale: number,
    range: number | undefined,
    target: EntityTrace | null,
    bearing: number,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

class TracesOverlay extends React.Component<TracesOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        range: undefined,
    };

    constructor(props: TracesOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const bearingRotation = SvgTransforms.rotate(-this.props.bearing);

        const maxRange = this.props.range ? this.props.range : this.props.sensors.range;
        const range = maxRange * this.props.scale;
        const scale = this.props.r / range;

        const traces = SensorsService.getTraces(this.props.sensors, range).map(
            (trace: EntityTrace) => this.renderTrace(trace, scale)
        );

        return (
            <g transform={this.translation + ' ' + bearingRotation} mask="url(#radarMask)">
                {traces}
            </g>
        );
    }

    private renderTrace(trace: EntityTrace, scale: number) {
        const position = Coords.scale(trace.relativePosition, scale);
        return (
            <TraceElement
                key={'scanner-trace-' + trace.id}
                x={position.x}
                y={-position.z}
                trace={trace}
                rotation={this.props.bearing}
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
        bearing: SpaceshipSelectors.getBearing(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(TracesOverlay);
