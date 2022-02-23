import * as React from 'react';
import Coords from '../../../lib/coords';
import Coloring from '../../../lib/coloring';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';

interface TracesOverlayProps {
    x: number,
    y: number,
    scale: number,
    traces: EntityTrace[],
    visible: boolean,
}

export default class TracesOverlay extends React.Component<TracesOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        visible: true,
    };

    constructor(props: TracesOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const markers = this.props.traces.map(trace => this.renderTrace(trace));
        return (
            <g transform={this.translation}>
                {markers}
            </g>
        );
    }

    private renderTrace(trace: EntityTrace) {
        const position = Coords.scale(trace.spatial.relativePosition, this.props.scale);
        return (
            <rect
                key={'sectors-trace-' + trace.id}
                x={position.x}
                y={-position.z}
                width="2" height="2"
                fill={Coloring.getReputationColor(trace.reputation)}
                stroke="none"
            />
        );
    }
}
