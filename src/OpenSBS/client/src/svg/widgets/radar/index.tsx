import * as React from 'react';
import {connect} from 'react-redux';
import ZoomControls from '../../commons/zoomControls';
import GroupLabel from '../../elements/groupLabel';
import PanelElement from '../../elements/panelElement';
import ShipElement from '../../elements/shipElement';
import SwitchElement from '../../elements/switchElement';
import SensorsModule from '../../../modules/sensors/sensorsModule';
import CompassOverlay from './compassOverlay';
import DistancesOverlay from './distancesOverlay';
import SidesOverlay from './sidesOverlay';
import TracesOverlay from './tracesOverlay';
import ClientSelectors from '../../../store/client/clientSelectors';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ColorPalette from '../../colorPalette';
import SensorsService from '../../../modules/sensors/sensorsService';

interface RadarWidgetProps {
    x: number,
    y: number,
    bearing: number,
    sensors: SensorsModule | undefined,
}

interface RadarWidgetState {
    range: number,
    zoom: number,
    showDistancesOverlay: boolean,
    showSidesOverlay: boolean,
}

class RadarWidget extends React.Component<RadarWidgetProps, RadarWidgetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            range: 10000,
            zoom: 1,
            showDistancesOverlay: true,
            showSidesOverlay: true,
        };

        this.setRange = this.setRange.bind(this);
        this.setZoom = this.setZoom.bind(this);
        this.toggleDistancesOverlay = this.toggleDistancesOverlay.bind(this);
        this.toggleSidesOverlay = this.toggleSidesOverlay.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const effectiveRange = this.state.range * this.state.zoom;
        const maximumRange = this.props.sensors.range;
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                <CompassOverlay x={500} y={500} r={460} rotation={this.props.bearing}/>

                {
                    this.state.showDistancesOverlay &&
                    <DistancesOverlay x={500} y={500} range={effectiveRange}/>
                }
                {
                    this.state.showSidesOverlay &&
                    <SidesOverlay x={500} y={500}/>
                }

                <g transform="translate(20 20)">
                    <line
                        x1="20" y1="20"
                        x2="200" y2="20"
                        stroke={ColorPalette.SECONDARY} strokeWidth="2"
                    />
                    <SwitchElement
                        x={0} y={0}
                        width={100} height={40}
                        fontSize={1.5} color={ColorPalette.SECONDARY}
                        onClick={() => this.setRange(10000)}
                        toggled={this.state.range <= 10000}
                    >SHORT</SwitchElement>
                    <SwitchElement
                        x={120} y={0}
                        width={100} height={40}
                        fontSize={1.5} color={ColorPalette.SECONDARY}
                        onClick={() => this.setRange(maximumRange)}
                        toggled={this.state.range > 10000}
                    >LONG</SwitchElement>
                    <GroupLabel x={110} y={68} size={120} mirrored={true}>RANGE</GroupLabel>
                </g>

                <ShipElement x={500} y={500}/>
                <TracesOverlay
                    x={500} y={500} r={460}
                    range={effectiveRange} bearing={this.props.bearing}
                    traces={SensorsService.getTraces(this.props.sensors, effectiveRange)}
                />
                <ZoomControls x={760} y={940} zoom={this.state.zoom} onChangeZoom={this.setZoom}/>

                <g transform="translate(20 940)">
                    <GroupLabel x={110} y={-28} size={120}>OVERLAYS</GroupLabel>
                    <SwitchElement
                        x={0} y={0}
                        width={100} height={40} fontSize={1.5}
                        onClick={this.toggleDistancesOverlay}
                        toggled={this.state.showDistancesOverlay}
                    >RANGES</SwitchElement>
                    <SwitchElement
                        x={120} y={0}
                        width={100} height={40} fontSize={1.5}
                        onClick={this.toggleSidesOverlay}
                        toggled={this.state.showSidesOverlay}
                    >SIDES</SwitchElement>
                </g>

                <circle
                    cx="500" cy="500" r="460"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    fill="none"
                />
            </PanelElement>
        );
    }

    private setRange(value: number) {
        this.setState({
            ...this.state,
            range: value
        });
    }

    private setZoom(value: number) {
        this.setState({
            ...this.state,
            zoom: value
        });
    }

    private toggleDistancesOverlay() {
        this.setState({
            ...this.state,
            showDistancesOverlay: !this.state.showDistancesOverlay
        });
    }

    private toggleSidesOverlay() {
        this.setState({
            ...this.state,
            showSidesOverlay: !this.state.showSidesOverlay
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        target: ClientSelectors.getSelectedTarget(state),
        bearing: SpaceshipSelectors.getBearing(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(RadarWidget);
