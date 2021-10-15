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
    maxItems: number,
    maxRange: number | undefined,
    target: EntityTrace | null,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

class TargetsWidget extends React.Component<TargetsWidgetProps, {}> {
    private readonly height: number;
    private readonly translation: string;

    public static defaultProps = {
        maxItems: 13,
        maxRange: undefined,
    };

    constructor(props: TargetsWidgetProps) {
        super(props);

        this.height = 30 + (this.props.maxItems * 30);
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }

    public render() {
        const targets = SensorsService
        .getTraces(this.props.sensors, this.getRangeLimit())
        .slice(0, this.props.maxItems)
        .map((trace: EntityTrace, index: number) => this.renderTargetRow(trace, index));

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={this.height}
                isOffline={!this.props.sensors}
            >
                <text
                    x="50" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.HEADER}
                >CALLSIGN</text>
                <text
                    x="190" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >DIR</text>
                <text
                    x="320" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >DISTANCE</text>
                <text
                    x="430" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >SPEED</text>
                {targets}
                <line
                    x1="40" y1="0"
                    x2="40" y2={this.height}
                    stroke={ColorPalette.MUTE} strokeWidth="1"
                />
                <line
                    x1="160" y1="0"
                    x2="160" y2={this.height}
                    stroke={ColorPalette.MUTE} strokeWidth="1"
                />
                <line
                    x1="220" y1="0"
                    x2="220" y2={this.height}
                    stroke={ColorPalette.MUTE} strokeWidth="1"
                />
                <line
                    x1="330" y1="0"
                    x2="330" y2={this.height}
                    stroke={ColorPalette.MUTE} strokeWidth="1"
                />
            </PanelElement>
        );
    }

    private getRangeLimit(): number {
        const sensorsRange = this.props.sensors?.range ?? 0;
        if (!this.props.maxRange) {
            return sensorsRange;
        }

        return Math.min(sensorsRange, this.props.maxRange)
    }

    private renderTargetRow(trace: EntityTrace, index: number) {
        return (
            <TargetRowElement
                key={`target-row-${trace.id}`}
                x={0} y={30 + (30 * index)}
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
