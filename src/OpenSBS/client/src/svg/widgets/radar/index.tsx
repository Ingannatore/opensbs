import * as React from 'react';
import {connect} from 'react-redux';
import SensorsModule from 'modules/sensors/sensorsModule';
import SensorsService from 'modules/sensors/sensorsService';
import ClientSelectors from 'store/client/clientSelectors';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import GroupLabel from 'svg/elements/groupLabel';
import PanelElement from 'svg/elements/panelElement';
import ShipElement from 'svg/elements/shipElement';
import SwitchElement from 'svg/elements/switchElement';
import ZoomControls from 'svg/commons/zoomControls';
import CompassOverlay from 'svg/widgets/radar/compassOverlay';
import DistancesOverlay from 'svg/widgets/radar/distancesOverlay';
import RangeControls from 'svg/widgets/radar/rangeControls';
import SidesOverlay from 'svg/widgets/radar/sidesOverlay';
import TracesOverlay from 'svg/widgets/radar/tracesOverlay';

interface RadarWidgetProps {
    x: number,
    y: number,
    bearing: number,
    sensors: SensorsModule | undefined,
}

interface RadarWidgetState {
    range: number,
    zoom: number,
    isDistancesOverlayVisible: boolean,
    isSidesOverlayVisible: boolean,
}

class RadarWidget extends React.Component<RadarWidgetProps, RadarWidgetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            range: 10000,
            zoom: 1,
            isDistancesOverlayVisible: true,
            isSidesOverlayVisible: true,
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
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                <RangeControls
                    x={10} y={10}
                    range={this.state.range} maximumRange={this.props.sensors.range}
                    onChange={this.setRange}
                />

                <g transform="translate(500, 500)">
                    <CompassOverlay rotation={this.props.bearing}/>
                    <DistancesOverlay
                        range={effectiveRange}
                        visible={this.state.isDistancesOverlayVisible}
                    />
                    <SidesOverlay visible={this.state.isSidesOverlayVisible}/>
                    <TracesOverlay
                        range={effectiveRange}
                        bearing={this.props.bearing}
                        traces={SensorsService.getTraces(this.props.sensors, effectiveRange)}
                    />
                    <ShipElement/>
                </g>

                <ZoomControls
                    x={770} y={950}
                    zoom={this.state.zoom}
                    onChangeZoom={this.setZoom}
                />

                <g transform="translate(10 950)">
                    <GroupLabel x={110} y={-28} size={120}>OVERLAYS</GroupLabel>
                    <SwitchElement
                        x={0} y={0}
                        width={100} height={40} fontSize={1.5}
                        onClick={this.toggleDistancesOverlay}
                        toggled={this.state.isDistancesOverlayVisible}
                    >RANGES</SwitchElement>
                    <SwitchElement
                        x={120} y={0}
                        width={100} height={40} fontSize={1.5}
                        onClick={this.toggleSidesOverlay}
                        toggled={this.state.isSidesOverlayVisible}
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
            isDistancesOverlayVisible: !this.state.isDistancesOverlayVisible
        });
    }

    private toggleSidesOverlay() {
        this.setState({
            ...this.state,
            isSidesOverlayVisible: !this.state.isSidesOverlayVisible
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
