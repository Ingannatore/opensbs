import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import Vector3 from '../../../models/vector3';
import EntityTrace from '../../../models/entityTrace';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import SensorsService from '../../../modules/sensors/sensorsService';
import TraceElement from '../../elements/traceElement';

interface TracesOverlayElementProps {
    x: number,
    y: number,
    mapScale: number,
    mapCenter: Vector3,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

class TracesOverlayElement extends React.Component<TracesOverlayElementProps, {}> {
    private readonly translation: string;

    constructor(props: TracesOverlayElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const traces = SensorsService.getAllTraces(this.props.sensors)
        .map((trace: EntityTrace) => this.renderTrace(trace));

        return (
            <g transform={this.translation} mask="url(#mapMask)">
                {traces}
            </g>
        );
    }

    private renderTrace(trace: EntityTrace) {
        return (
            <TraceElement
                key={'map-trace-' + trace.id}
                trace={trace}
                selected={trace.id === this.props.target?.id}
                scale={this.props.mapScale}
                center={this.props.mapCenter}
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
        mapScale: ClientSelectors.getMapScale(state),
        mapCenter: ClientSelectors.getMapCenter(state),
        target: ClientSelectors.getSelectedTarget(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(TracesOverlayElement);
