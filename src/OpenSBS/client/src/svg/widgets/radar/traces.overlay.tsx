import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import {SensorsTraceModel} from '../../../modules/sensors-trace.model';
import Vector3 from '../../../models/vector3';
import Vectors from '../../../lib/vectors';
import Angles from '../../../lib/angles';

interface TracesOverlayModel {
    range: number,
    direction: Vector3,
    markers: SensorsTraceModel[]
}

export default class TracesOverlay extends React.Component<TracesOverlayModel, {}> {
    public render() {
        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const scale = 440 / this.props.range;
        const markers = this.props.markers
        .filter((trace: SensorsTraceModel) => trace.distance <= this.props.range)
        .map((trace: SensorsTraceModel) => TracesOverlay.renderMarker(trace, scale, yaw));

        return (
            <g transform={SvgTransforms.rotate(-yaw)}>
                {markers}
            </g>
        );
    }

    private static renderMarker(trace: SensorsTraceModel, scale: number, yaw: number) {
        const transform = SvgTransforms.translate(
            trace.relativePosition.x * scale,
            trace.relativePosition.z * scale
        );

        return (
            <g key={`trace-${trace.id}`} transform={transform}>
                <circle x="0" y="0" r="4" stroke="white" fill="none"/>
                <text
                    x="0" y="18"
                    fontSize="1rem" fill="#dedede" textAnchor="middle"
                    transform={SvgTransforms.rotate(yaw)}
                >{trace.callSign}</text>
            </g>
        );
    }
}
