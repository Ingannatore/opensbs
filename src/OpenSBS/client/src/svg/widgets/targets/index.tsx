import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import PanelElement from '../../elements/panel.element';
import ClientSelectors from '../../../store/client/client.selectors';
import {SensorsModuleModel} from '../../../modules/sensors-module.model';
import TargetsPropsModel from './targets-props.model';
import ClientActions from '../../../store/client/client.actions';
import TargetElement from './target.element';
import {SensorsTraceModel} from '../../../modules/sensors-trace.model';
import ColorPalette from '../../color-palette';

class TargetsWidget extends React.Component<TargetsPropsModel, {}> {
    private readonly translation: string;

    constructor(props: TargetsPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onTraceClick = this.onTraceClick.bind(this);
    }

    public render() {
        const targets = (this.props.sensorsModule?.traces ?? [])
        .sort((a: SensorsTraceModel, b: SensorsTraceModel) => a.distance - b.distance)
        .slice(0, 10)
        .map((trace: SensorsTraceModel, index: number) => this.renderTargetRow(trace, index));

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={430}  isOffline={!this.props.sensorsModule}>
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

    private renderTargetRow(trace: SensorsTraceModel, index: number) {
        return (
            <TargetElement
                x={0} y={30 + (40 * index)}
                trace={trace}
                isSelected={trace.id === this.props.target}
                onClick={() => this.onTraceClick(trace.id)}
            />
        )
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

export default connect(mapStateToProps)(TargetsWidget);
