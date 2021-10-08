import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import EntityTrace from '../../../models/entityTrace';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import SensorsService from '../../../modules/sensors/sensorsService';
import ColorPalette from '../../colorPalette';

interface TracesOverlayElementProps {
    size: number,
    dispatch: any,
    radarScale: number,
    bearing: number,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
}

class TracesOverlayElement extends React.Component<TracesOverlayElementProps, {}> {
    constructor(props: TracesOverlayElementProps) {
        super(props);

        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const range = 400 * this.props.radarScale;

        const traces = SensorsService.findTraces(this.props.sensors, range)
        .map((trace: EntityTrace) => this.renderTrace(trace, this.props.radarScale, this.props.bearing));

        return (
            <g transform={SvgTransforms.rotate(-this.props.bearing)}>
                {traces}
            </g>
        );
    }

    private renderTrace(trace: EntityTrace, scale: number, yaw: number) {
        const isSelected = trace.id === this.props.target?.id;
        const transform = SvgTransforms.translate(
            trace.relativePosition.x / scale,
            -trace.relativePosition.z / scale
        );

        return (
            <g
                key={`radar-trace-${trace.id}`}
                transform={transform} cursor="pointer"
                onClick={() => this.onTraceClick(trace)}
            >
                <circle
                    x="0" y="0" r="4"
                    stroke={ColorPalette.TEXT} strokeWidth="2"
                    fill={ColorPalette.BACKGROUND}
                />
                <text
                    x="0" y="20"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
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
        radarScale: ClientSelectors.getRadarScale(state),
        bearing: SpaceshipSelectors.getBearing(state),
        target: ClientSelectors.getSelectedTarget(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(TracesOverlayElement);
