import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import SensorsModule from 'modules/sensors/sensorsModule';
import SensorsService from 'modules/sensors/sensorsService';
import GroupLabel from 'svg/elements/groupLabel';
import ShipElement from 'svg/elements/shipElement';
import SwitchElement from 'svg/elements/switchElement';
import RangeControls from 'svg/widgets/radar/rangeControls';
import CompassBezel from 'svg/widgets/scanner/bezels/compassBezel';
import ZoomControls from 'svg/widgets/scanner/controls/zoomControls';
import DistancesOverlay from 'svg/widgets/scanner/overlays/distancesOverlay';
import SidesOverlay from 'svg/widgets/scanner/overlays/sidesOverlay';
import TracesOverlay from 'svg/widgets/scanner/overlays/tracesOverlay';

interface NavigationModeProps {
    x: number,
    y: number,
    bearing: number,
    sensors: SensorsModule | undefined,
}

interface NavigationModeState {
    range: number,
    zoom: number,
    isDistancesOverlayVisible: boolean,
    isSidesOverlayVisible: boolean,
}

export default class NavigationMode extends React.Component<NavigationModeProps, NavigationModeState> {
    private readonly translation: string;

    constructor(props: any) {
        super(props);
        this.state = {
            range: 10000,
            zoom: 1,
            isDistancesOverlayVisible: true,
            isSidesOverlayVisible: true,
        };

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.setRange = this.setRange.bind(this);
        this.setZoom = this.setZoom.bind(this);
        this.toggleDistancesOverlay = this.toggleDistancesOverlay.bind(this);
        this.toggleSidesOverlay = this.toggleSidesOverlay.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const effectiveRange = this.state.range * (1 / this.state.zoom);
        return (
            <g transform={this.translation}>
                <RangeControls
                    x={10} y={10}
                    range={this.state.range} maximumRange={this.props.sensors.range}
                    onChange={this.setRange}
                />

                <g transform="translate(500, 500)">
                    <CompassBezel rotation={this.props.bearing}/>
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
                    x={880} y={970}
                    value={this.state.zoom}
                    onChange={this.setZoom}
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
            </g>
        );
    }

    private setRange(value: number) {
        this.setState({
            ...this.state,
            range: value,
        });
    }

    private setZoom(value: number) {
        this.setState({
            ...this.state,
            zoom: value,
        });
    }

    private toggleDistancesOverlay() {
        this.setState({
            ...this.state,
            isDistancesOverlayVisible: !this.state.isDistancesOverlayVisible,
        });
    }

    private toggleSidesOverlay() {
        this.setState({
            ...this.state,
            isSidesOverlayVisible: !this.state.isSidesOverlayVisible,
        });
    }
}
