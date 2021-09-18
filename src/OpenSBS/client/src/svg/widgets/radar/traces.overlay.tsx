import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import Vector3 from '../../../models/vector3';
import Vectors from '../../../lib/vectors';
import Angles from '../../../lib/angles';
import ClientActions from '../../../store/client/client.actions';
import ClientSelectors from '../../../store/client/client.selectors';
import EntityTraceModel from '../../../modules/entity-trace.model';
import {SensorsModuleModel} from '../../../modules/sensors-module.model';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import ColorPalette from '../../color-palette';

interface TracesOverlayModel {
    dispatch: any,
    range: number,
    direction: Vector3,
    target: EntityTraceModel | null,
    sensors: SensorsModuleModel | undefined,
}

class TracesOverlay extends React.Component<TracesOverlayModel, {}> {
    constructor(props: TracesOverlayModel) {
        super(props);

        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const scale = 440 / this.props.range;
        const traces = this.props.sensors.traces
        .filter((trace: EntityTraceModel) => trace.distance <= this.props.range)
        .map((trace: EntityTraceModel) => this.renderTrace(trace, scale, yaw));

        return (
            <g transform={SvgTransforms.rotate(-yaw)}>
                {traces}
            </g>
        );
    }

    private renderTrace(trace: EntityTraceModel, scale: number, yaw: number) {
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

    private onTraceClick(trace: EntityTraceModel) {
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
