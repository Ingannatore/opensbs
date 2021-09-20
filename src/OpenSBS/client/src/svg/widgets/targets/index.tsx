import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import PanelElement from '../../elements/panel.element';
import ClientSelectors from '../../../store/client/client.selectors';
import {SensorsModuleModel} from '../../../modules/sensors-module.model';
import ClientActions from '../../../store/client/client.actions';
import TargetElement from './target.element';
import EntityTraceModel from '../../../modules/entity-trace.model';
import ColorPalette from '../../color-palette';

interface TargetsProps {
    x: number,
    y: number,
    dispatch: any,
    target: EntityTraceModel | null,
    sensorsModule: SensorsModuleModel | undefined,
}

class TargetsWidget extends React.Component<TargetsProps, {}> {
    private readonly translation: string;

    constructor(props: TargetsProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        const targets = (this.props.sensorsModule?.traces ?? [])
        .sort((a: EntityTraceModel, b: EntityTraceModel) => a.distance - b.distance)
        .slice(0, 10)
        .map((trace: EntityTraceModel, index: number) => this.renderTargetRow(trace, index));

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={430} isOffline={!this.props.sensorsModule}>
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
        return (
            <TargetElement
                key={`target-element-${trace.callSign}`}
                x={0} y={30 + (40 * index)}
                trace={trace}
                isSelected={trace.id === this.props.target?.id}
                onClick={() => this.onTraceClick(trace)}
            />
        )
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
        sensorsModule: SpaceshipSelectors.getModuleByType<SensorsModuleModel>(state, 'module.sensors')
    };
};

export default connect(mapStateToProps)(TargetsWidget);
