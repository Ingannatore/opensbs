import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import {SensorsTraceModel} from '../../../modules/sensors-trace.model';

interface TracesOverlayModel {
    range: number,
    rotation: number,
    markers: SensorsTraceModel[]
}

export default class TracesOverlay extends React.Component<TracesOverlayModel, {}> {
    public render() {
        const scale = 440 / this.props.range;
        const markers = this.props.markers
        .filter((trace: SensorsTraceModel) => trace.distance <= this.props.range)
        .map((trace: SensorsTraceModel) => this.renderMarker(trace, scale));

        return (
            <g transform={SvgTransforms.rotate(-this.props.rotation)}>
                {markers}
            </g>
        );
    }

    private renderMarker(trace: SensorsTraceModel, scale: number) {
        const transform = SvgTransforms.translate(
            trace.relativePosition.x * scale,
            trace.relativePosition.y * scale
        );

        return (
            <g key={`trace-${trace.id}`} transform={transform}>
                <circle x="0" y="0" r="4" stroke="white" fill="none"/>
                <text
                    x="0" y="18"
                    fontSize="1rem" fill="#dedede" textAnchor="middle"
                    transform={SvgTransforms.rotate(this.props.rotation)}
                >{trace.callSign}</text>
            </g>
        );
    }
}
