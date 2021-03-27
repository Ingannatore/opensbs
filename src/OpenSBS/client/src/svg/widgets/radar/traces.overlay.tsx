import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import {SensorsTraceModel} from '../../../modules/sensors-trace.model';
import Vector3 from '../../../models/vector3';
import Vectors from '../../../lib/vectors';
import Angles from '../../../lib/angles';

interface TracesOverlayModel {
    range: number,
    direction: Vector3,
    traces: SensorsTraceModel[],
    selectedTraceId: string | null,
    onTraceClick: (event: React.MouseEvent<SVGElement, MouseEvent>, id: string | null) => void,
}

export default class TracesOverlay extends React.Component<TracesOverlayModel, {}> {
    public static defaultProps = {
        selectedTraceId: null,
    };

    constructor(props: TracesOverlayModel) {
        super(props);

        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const scale = 440 / this.props.range;
        const markers = this.props.traces
        .filter((trace: SensorsTraceModel) => trace.distance <= this.props.range)
        .map((trace: SensorsTraceModel) => this.renderMarker(trace, scale, yaw));

        return (
            <g transform={SvgTransforms.rotate(-yaw)}>
                {markers}
            </g>
        );
    }

    private renderMarker(trace: SensorsTraceModel, scale: number, yaw: number) {
        const isSelected = trace.id === this.props.selectedTraceId;
        const transform = SvgTransforms.translate(
            trace.relativePosition.x * scale,
            -trace.relativePosition.z * scale
        );

        return (
            <g
                id={trace.id} key={`trace-${trace.id}`}
                transform={transform} cursor="pointer"
                onClick={this.onTraceClick}
            >
                <circle
                    x="0" y="0" r="4"
                    stroke="whitesmoke" strokeWidth="2"
                    fill="black"
                />
                <text
                    x="0" y="20"
                    fontSize="1rem" fill="#dedede" textAnchor="middle"
                    transform={SvgTransforms.rotate(yaw)}
                >{trace.callSign}</text>
                {isSelected && <rect
                    x="-8" y="-8"
                    width="16" height="16"
                    stroke="darkturquoise" strokeWidth="2" fill="none"
                    transform={SvgTransforms.rotate(yaw + 45)}
                />}
            </g>
        );
    }

    private onTraceClick(event: React.MouseEvent<SVGElement, MouseEvent>) {
        const target = event.currentTarget as SVGElement;
        if (target.id === this.props.selectedTraceId) {
            this.props.onTraceClick(event, null);
        } else {
            this.props.onTraceClick(event, target.id);
        }
    }
}
