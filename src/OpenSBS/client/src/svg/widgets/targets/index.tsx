import * as React from 'react';
import {connect} from 'react-redux';
import Angles from '../../../lib/angles';
import SvgTransforms from '../../../lib/svgTransforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import PanelElement from '../../elements/panel.element';
import ClientSelectors from '../../../store/client/clientSelectors';
import ClientActions from '../../../store/client/clientActions';
import EntityTrace from '../../../models/entityTrace';
import SwitchElement from '../../elements/switch.element';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import SensorsService from '../../../modules/sensors/sensorsService';
import ColorPalette from '../../colorPalette';

interface TargetsWidgetProps {
    x: number,
    y: number,
    dispatch: any,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
}

class TargetsWidget extends React.Component<TargetsWidgetProps, {}> {
    private readonly translation: string;

    constructor(props: TargetsWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }

    public render() {
        const targets = SensorsService.findNearestTraces(this.props.sensors).map(
            (trace: EntityTrace, index: number) => this.renderTargetRow(trace, index)
        );

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={430}
                isOffline={!this.props.sensors}
            >
                <line
                    x1="40" y1="0"
                    x2="40" y2="430"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <text
                    x="50" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.HEADER}
                >CALLSIGN</text>
                <text
                    x="260" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >TYPE</text>
                <line
                    x1="270" y1="0"
                    x2="270" y2="430"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <text
                    x="370" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >DISTANCE</text>
                <text
                    x="430" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >DIR.</text>
                {targets}
                <line
                    x1="380" y1="0"
                    x2="380" y2="430"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
            </PanelElement>
        );
    }

    private renderTargetRow(trace: EntityTrace, index: number) {
        const transform = SvgTransforms.translate(0, 30 + (40 * index));
        return (
            <g transform={transform} key={`target-row-${trace.callSign}`}>
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <SwitchElement
                    x={10} y={10}
                    width={20} height={20}
                    onClick={() => this.onTargetSelect(trace)}
                    toggled={trace.id === this.props.target?.id}
                />
                <text
                    x="50" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{trace.callSign}</text>
                <use
                    x="230" y="5"
                    href={`/images/icons.svg#icon-${trace.type}`}
                    fill="none" stroke={ColorPalette.TEXT}
                />
                <text
                    x="370" y="20"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{trace.distance}</text>
                <text
                    x="430" y="20"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{Angles.bearingToString(trace.relativeBearing)}</text>
            </g>
        );
    }

    private onTargetSelect(trace: EntityTrace) {
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

export default connect(mapStateToProps)(TargetsWidget);
