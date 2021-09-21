import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import Angles from '../../../lib/angles';
import Vectors from '../../../lib/vectors';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import PanelElement from '../../elements/panel.element';
import ClientSelectors from '../../../store/client/client.selectors';
import ClientActions from '../../../store/client/client.actions';
import EntityTraceModel from '../../../modules/entity-trace.model';
import SwitchElement from '../../elements/switch.element';
import ColorPalette from '../../color-palette';

interface TargetsProps {
    x: number,
    y: number,
    dispatch: any,
    target: EntityTraceModel | null,
    traces: EntityTraceModel[],
}

class TargetsWidget extends React.Component<TargetsProps, {}> {
    private readonly translation: string;

    constructor(props: TargetsProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTargetSelect = this.onTargetSelect.bind(this);
    }

    public render() {
        const targets = this.props.traces
        .sort((a: EntityTraceModel, b: EntityTraceModel) => a.distance - b.distance)
        .slice(0, 10)
        .map((trace: EntityTraceModel, index: number) => this.renderTargetRow(trace, index));

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={430}>
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

    private renderTargetRow(trace: EntityTraceModel, index: number) {
        const yaw = Angles.normalizeYaw(Vectors.getYaw(trace.relativeDirection));

        return (
            <g transform={SvgTransforms.translate(0, 30 + (40 * index))} key={`target-row-${trace.callSign}`}>
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
                >{yaw.toString().padStart(3, '0')}</text>
            </g>
        );
    }

    private onTargetSelect(trace: EntityTraceModel) {
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
        traces: SpaceshipSelectors.getTraces(state)
    };
};

export default connect(mapStateToProps)(TargetsWidget);
