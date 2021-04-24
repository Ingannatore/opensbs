import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import {SensorsTraceModel} from '../../../modules/sensors-trace.model';
import Vector3 from '../../../models/vector3';
import Vectors from '../../../lib/vectors';
import Angles from '../../../lib/angles';
import ClientActions from '../../../store/client/client.actions';
import ClientSelectors from '../../../store/client/client.selectors';
import {connect} from 'react-redux';
import {SensorsModuleModel} from '../../../modules/sensors-module.model';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';

interface TracesOverlayModel {
    dispatch: any,
    range: number,
    direction: Vector3,
    target: string | null,
    sensorsModule: SensorsModuleModel | undefined,
}

class TracesOverlay extends React.Component<TracesOverlayModel, {}> {
    constructor(props: TracesOverlayModel) {
        super(props);

        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        if (!this.props.sensorsModule) {
            return null;
        }

        const yaw = Angles.normalize(Angles.toDegrees(Vectors.getYaw(this.props.direction)));
        const scale = 440 / this.props.range;
        const traces = this.props.sensorsModule.traces
        .filter((trace: SensorsTraceModel) => trace.distance <= this.props.range)
        .map((trace: SensorsTraceModel) => this.renderTrace(trace, scale, yaw));

        return (
            <g transform={SvgTransforms.rotate(-yaw)}>
                {traces}
            </g>
        );
    }

    private renderTrace(trace: SensorsTraceModel, scale: number, yaw: number) {
        const isSelected = trace.id === this.props.target;
        const transform = SvgTransforms.translate(
            trace.relativePosition.x * scale,
            -trace.relativePosition.z * scale
        );

        return (
            <g
                key={`trace-${trace.id}`}
                transform={transform} cursor="pointer"
                onClick={() => this.onTraceClick(trace.id)}
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

    private onTraceClick(id: string) {
        if (id === this.props.target) {
            this.props.dispatch(ClientActions.resetTarget());
        } else {
            this.props.dispatch(ClientActions.setTarget(id));
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getTarget(state),
        sensorsModule: SpaceshipSelectors.getModuleByType<SensorsModuleModel>(state, 'module.sensors')
    };
};

export default connect(mapStateToProps)(TracesOverlay);
