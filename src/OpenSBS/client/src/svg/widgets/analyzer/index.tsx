import EntityTrace from 'models/entityTrace';
import SensorsModule from 'modules/sensors/sensorsModule';
import SensorsService from 'modules/sensors/sensorsService';
import * as React from 'react';
import {connect} from 'react-redux';
import ClientSelectors from 'store/client/clientSelectors';
import {resetTarget, selectTarget} from 'store/client/clientSlice';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import PanelElement from 'svg/elements/panelElement';
import UnscannedTrace from 'svg/widgets/analyzer/unscannedTrace';

interface AnalyzerWidgetProps {
    x: number,
    y: number,
    selectedTrace: EntityTrace | null,
    sensors: SensorsModule | undefined,
    dispatch: any,
}

class AnalyzerWidget extends React.Component<AnalyzerWidgetProps, {}> {
    constructor(props: any) {
        super(props);
        
        this.onSelectTraceHandler = this.onSelectTraceHandler.bind(this);
    }

    public render() {
        const unscannedTraces = SensorsService
            .getUnscannedTraces(this.props.sensors, this.props.sensors?.range || 0)
            .slice(0, 16)
            .map((trace: EntityTrace, index: number) => this.renderUnknownTrace(trace, index));

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000} isOffline={!this.props.sensors}>
                <line x1="0" y1="40" x2="280" y2="40" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                <line x1="280" y1="0" x2="280" y2="1000" stroke={ColorPalette.MUTE} strokeWidth="2"/>

                <line x1="720" y1="40" x2="1000" y2="40" stroke={ColorPalette.MUTE} strokeWidth="2"/>
                <line x1="720" y1="0" x2="720" y2="1000" stroke={ColorPalette.MUTE} strokeWidth="2"/>

                <text
                    x="140" y="20"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >SCANNED TRACES</text>
                <text
                    x="860" y="20"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >UNSCANNED TRACES</text>

                <g transform="translate(720 40)">
                    {unscannedTraces}
                </g>
            </PanelElement>
        );
    }

    private renderUnknownTrace(trace: EntityTrace, index: number) {
        return (
            <UnscannedTrace
                x={0} y={index * 60}
                trace={trace}
                selected={trace.id === this.props.selectedTrace?.id}
                onClick={this.onSelectTraceHandler}
            />
        );
    }

    private onSelectTraceHandler(trace: EntityTrace) {
        if (trace.id === this.props.selectedTrace?.id) {
            this.props.dispatch(resetTarget());
        } else {
            this.props.dispatch(selectTarget(trace));
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        selectedTrace: ClientSelectors.getSelectedTarget(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(AnalyzerWidget);
