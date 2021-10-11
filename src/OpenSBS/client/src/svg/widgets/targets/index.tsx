import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import PanelElement from '../../elements/panelElement';
import ClientSelectors from '../../../store/client/clientSelectors';
import ClientActions from '../../../store/client/clientActions';
import EntityTrace from '../../../models/entityTrace';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import SensorsService from '../../../modules/sensors/sensorsService';
import TargetRowElement from './targetRowElement';
import ColorPalette from '../../colorPalette';

interface TargetsWidgetProps {
    x: number,
    y: number,
    size: number,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

class TargetsWidget extends React.Component<TargetsWidgetProps, {}> {
    private readonly height: number;
    private readonly translation: string;

    public static defaultProps = {
        size: 10,
    };

    constructor(props: TargetsWidgetProps) {
        super(props);

        this.height = 30 + (this.props.size * 40);
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }

    public render() {
        const targets = SensorsService.findNearestTraces(this.props.sensors, this.props.size).map(
            (trace: EntityTrace, index: number) => this.renderTargetRow(trace, index)
        );

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={this.height}
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
                <line
                    x1="380" y1="0"
                    x2="380" y2="430"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <text
                    x="430" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >DIR.</text>
                {targets}
            </PanelElement>
        );
    }

    private renderTargetRow(trace: EntityTrace, index: number) {
        return (
            <TargetRowElement
                key={`target-row-${trace.callSign}`}
                x={0} y={30 + (40 * index)}
                trace={trace}
                selected={trace.id === this.props.target?.id}
                onClick={this.onTargetSelect}
            />
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
