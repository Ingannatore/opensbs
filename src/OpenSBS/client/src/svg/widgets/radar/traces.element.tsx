import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import Vector3 from '../../../models/vector3';
import Vectors from '../../../lib/vectors';
import Angles from '../../../lib/angles';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import EntityTrace from '../../../models/entityTrace';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ColorPalette from '../../colorPalette';

interface TracesElementProps {
    size: number,
    dispatch: any,
    zoomFactor: number,
    direction: Vector3,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
}

class TracesElement extends React.Component<TracesElementProps, {}> {
    constructor(props: TracesElementProps) {
        super(props);

        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public static defaultProps = {
        zoomFactor: 1,
    };

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const range = Math.round(8000 * (1 / this.props.zoomFactor));
        const scale = 400 / range;

        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const traces = this.props.sensors.traces
        .filter((trace: EntityTrace) => trace.distance <= range)
        .map((trace: EntityTrace) => this.renderTrace(trace, scale, yaw));

        return (
            <g transform={SvgTransforms.rotate(-yaw)}>
                {traces}
            </g>
        );
    }

    private renderTrace(trace: EntityTrace, scale: number, yaw: number) {
        const isSelected = trace.id === this.props.target?.id;
        const transform = SvgTransforms.translate(
            trace.relativePosition.x * scale,
            -trace.relativePosition.z * scale
        );

        return (
            <g
                key={`trace-${trace.id}`}
                transform={transform} cursor="pointer"
                onClick={() => this.onTraceClick(trace)}
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
                {isSelected && <use href="/images/icons.svg#brackets" x="-50" y="-18" stroke={ColorPalette.DANGER}/>}
            </g>
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
        zoomFactor: ClientSelectors.getZoomFactor(state),
        target: ClientSelectors.getSelectedTarget(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(TracesElement);
