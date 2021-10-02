import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
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
    direction: number,
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

        const bearing = this.props.direction;
        const traces = this.props.sensors.traces
        .filter((trace: EntityTrace) => trace.distance <= range)
        .map((trace: EntityTrace) => this.renderTrace(trace, scale, bearing));

        return (
            <g transform={SvgTransforms.rotate(-bearing)}>
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
                {
                    isSelected &&
                    <use
                        href="/images/icons.svg#brackets"
                        x="-50" y="-18"
                        stroke={ColorPalette.DANGER}
                        transform={SvgTransforms.rotate(yaw)}
                    />
                }
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
