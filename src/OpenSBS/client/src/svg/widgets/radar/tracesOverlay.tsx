import * as React from 'react';
import {connect} from 'react-redux';
import Coords from '../../../lib/coords';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import TraceElement from '../../elements/traceElement';
import {selectTarget, resetTarget} from '../../../store/client/clientSlice';
import ClientSelectors from '../../../store/client/clientSelectors';

interface TracesOverlayProps {
    x: number,
    y: number,
    r: number,
    range: number,
    target: EntityTrace | null,
    traces: EntityTrace[],
    bearing: number,
    dispatch: any,
}

class TracesOverlay extends React.Component<TracesOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        r: 460,
    };

    constructor(props: TracesOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        const bearingRotation = SvgTransforms.rotate(-this.props.bearing);
        const scale = this.props.r / this.props.range;

        const traces = this.props.traces.map(
            (trace: EntityTrace) => this.renderTrace(trace, scale)
        );

        return (
            <g transform={this.translation + ' ' + bearingRotation} mask="url(#radarMask)">
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
                rotation={this.props.bearing}
                selected={trace.id === this.props.target?.id}
                onClick={this.onTraceClick}
            />
        );
    }

    private onTraceClick(trace: EntityTrace) {
        if (trace.id === this.props.target?.id) {
            this.props.dispatch(resetTarget());
        } else {
            this.props.dispatch(selectTarget(trace));
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state),
    };
};

export default connect(mapStateToProps)(TracesOverlay);
