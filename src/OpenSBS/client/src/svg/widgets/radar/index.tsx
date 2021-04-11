import * as React from 'react';
import {connect} from 'react-redux';
import DirectionsOverlay from './directions.overlay';
import RangesOverlay from './ranges.overlay';
import TracesOverlay from './traces.overlay';
import SpaceshipSelectors from '../../../store/spaceship/spaceship.selectors';
import {SensorsModuleModel} from '../../../modules/sensors-module.model';
import Vector3 from '../../../models/vector3';
import SwitchElement from '../../elements/switch.element';
import DisplayElement from '../../elements/display.element';
import PanelElement from '../../elements/panel.element';

interface RadarWidgetModel {
    x: number,
    y: number,
    direction: Vector3,
    sensorsModule: SensorsModuleModel | undefined,
}

interface RadarWidgetState {
    range: number,
    enableDirectionsOverlay: boolean,
    enableRangesOverlay: boolean,
    enableWeaponsOverlay: boolean,
    selectedTraceId: string | null,
}

class RadarWidget extends React.Component<RadarWidgetModel, RadarWidgetState> {
    public static defaultProps = {
        x: 0,
        y: 0,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            range: 8000,
            enableDirectionsOverlay: true,
            enableRangesOverlay: true,
            enableWeaponsOverlay: false,
            selectedTraceId: null,
        };

        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
        this.toggleWeaponsOverlay = this.toggleWeaponsOverlay.bind(this);
        this.setRange = this.setRange.bind(this);
        this.selectTrace = this.selectTrace.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                <path
                    d="M 0 10 L 10 0 L 990 0 L 1000 10 L 1000 990 L 990 1000 L 10 1000 L 0 990 Z"
                    stroke="#383838" strokeWidth="2" fill="black"
                    shapeRendering="crispEdges"
                />

                <DisplayElement
                    x={100} y={70}
                    topLabel="TARGET DISTANCE"
                    bottomLabel="meters"
                >{this.getSelectedTraceDistance()}</DisplayElement>
                <DisplayElement
                    x={900} y={70}
                    topLabel="RADAR RANGE"
                    bottomLabel="meters"
                >{this.state.range}</DisplayElement>

                <g transform="translate(500 500)">
                    <circle
                        cx="0" cy="0" r="470"
                        stroke="#383838" strokeWidth="1"
                    />
                    <RangesOverlay
                        range={this.state.range}
                        visible={this.state.enableRangesOverlay}
                    />
                    <DirectionsOverlay
                        r={470}
                        visible={this.state.enableDirectionsOverlay}
                    />
                    <TracesOverlay
                        range={this.state.range}
                        direction={this.props.direction}
                        traces={this.props.sensorsModule?.traces ?? []}
                        selectedTraceId={this.state.selectedTraceId}
                        onTraceClick={this.selectTrace}
                    />
                    <use href="#icon-ship" x="-6" y="-6"/>
                </g>

                <g transform="translate(0 1000)">
                    <SwitchElement
                        x={10} y={-150}
                        width={120} height={40}
                        onClick={this.toggleDirectionsOverlay}
                        toggled={this.state.enableDirectionsOverlay}
                    >SECTORS</SwitchElement>
                    <SwitchElement
                        x={10} y={-100}
                        width={120} height={40}
                        onClick={this.toggleRangesOverlay}
                        toggled={this.state.enableRangesOverlay}
                    >RANGES</SwitchElement>
                    <SwitchElement
                        x={10} y={-50}
                        width={120} height={40}
                        enabled={false}
                        onClick={this.toggleWeaponsOverlay}
                        toggled={this.state.enableWeaponsOverlay}
                    >WEAPONS</SwitchElement>
                </g>

                <g transform="translate(1000 1000)">
                    <SwitchElement
                        x={-130} y={-150}
                        width={120} height={40}
                        onClick={() => this.setRange(8000)}
                        toggled={this.state.range === 8000}
                    >NO ZOOM</SwitchElement>
                    <SwitchElement
                        x={-130} y={-100}
                        width={120} height={40}
                        onClick={() => this.setRange(4000)}
                        toggled={this.state.range === 4000}
                    >ZOOM ×2</SwitchElement>
                    <SwitchElement
                        x={-130} y={-50}
                        width={120} height={40}
                        onClick={() => this.setRange(2000)}
                        toggled={this.state.range === 2000}
                    >ZOOM ×4</SwitchElement>
                </g>
            </PanelElement>
        );
    }

    private toggleDirectionsOverlay() {
        this.setState({
            ...this.state,
            enableDirectionsOverlay: !this.state.enableDirectionsOverlay
        });
    }

    private toggleRangesOverlay() {
        this.setState({
            ...this.state,
            enableRangesOverlay: !this.state.enableRangesOverlay
        });
    }

    private toggleWeaponsOverlay() {
        this.setState({
            ...this.state,
            enableWeaponsOverlay: !this.state.enableWeaponsOverlay
        });
    }

    private setRange(range: number) {
        this.setState({...this.state, range: range});
    }

    private selectTrace(id: string | null) {
        this.setState({
            ...this.state,
            selectedTraceId: id
        });
    }

    private getSelectedTraceDistance() : string | null {
        if (!this.state.selectedTraceId) {
            return '-';
        }

        const traces = this.props.sensorsModule?.traces ?? [];
        const selectedTrace = traces.find((trace) => trace.id === this.state.selectedTraceId);

        return selectedTrace?.distance.toString() ?? '-';
    }
}

const mapStateToProps = (state: any) => {
    return {
        direction: SpaceshipSelectors.getDirection(state),
        sensorsModule: SpaceshipSelectors.getModuleByType<SensorsModuleModel>(state, 'module.sensors')
    };
};

export default connect(mapStateToProps)(RadarWidget);
