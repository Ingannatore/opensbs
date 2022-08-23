import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import SensorsModule from 'modules/sensors/sensorsModule';
import SensorsService from 'modules/sensors/sensorsService';
import ColorPalette from 'svg/colorPalette';
import ShipElement from 'svg/elements/shipElement';
import CompassBezel from 'svg/widgets/scanner/bezels/compassBezel';
import OverlaysControl from 'svg/widgets/scanner/controls/overlaysControl';
import RangeControl from 'svg/widgets/scanner/controls/rangeControl';
import ZoomControl from 'svg/widgets/scanner/controls/zoomControl';
import DistancesOverlay from 'svg/widgets/scanner/overlays/distancesOverlay';
import SidesOverlay from 'svg/widgets/scanner/overlays/sidesOverlay';
import TracesOverlay from 'svg/widgets/scanner/overlays/tracesOverlay';
import OverlayType from 'svg/widgets/scanner/overlayType';

interface NavigationModeProps {
    x: number,
    y: number,
    bearing: number,
    sensors: SensorsModule | undefined,
}

interface NavigationModeState {
    range: number,
    zoom: number,
    overlays: Record<OverlayType, boolean>,
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
            overlays: {
                [OverlayType.Ranges]: true,
                [OverlayType.Sides]: true,
                [OverlayType.Traces]: true,
            },
            isDistancesOverlayVisible: true,
            isSidesOverlayVisible: true,
        };

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onChangeRangeHandler = this.onChangeRangeHandler.bind(this);
        this.onChangeZoomHandler = this.onChangeZoomHandler.bind(this);
        this.onToggleOverlayHandler = this.onToggleOverlayHandler.bind(this);
    }

    public render() {
        if (!this.props.sensors) {
            return null;
        }

        const effectiveRange = this.state.range * (1 / this.state.zoom);
        return (
            <g transform={this.translation}>
                <RangeControl
                    x={120} y={30}
                    value={this.state.range} maxValue={this.props.sensors.range}
                    onChange={this.onChangeRangeHandler}
                />

                <g transform="translate(500, 500)">
                    <CompassBezel rotation={this.props.bearing}/>
                    <DistancesOverlay
                        range={effectiveRange}
                        visible={this.state.overlays[OverlayType.Ranges]}
                    />
                    <SidesOverlay visible={this.state.overlays[OverlayType.Sides]}/>
                    <TracesOverlay
                        range={effectiveRange}
                        bearing={this.props.bearing}
                        traces={SensorsService.getTraces(this.props.sensors, effectiveRange)}
                    />
                    <ShipElement/>
                    <circle
                        cx="0" cy="0" r="460"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                        fill="none"
                    />
                </g>

                <ZoomControl
                    x={880} y={970}
                    value={this.state.zoom}
                    onChange={this.onChangeZoomHandler}
                />
                <OverlaysControl
                    x={120} y={970}
                    values={this.state.overlays}
                    onToggle={this.onToggleOverlayHandler}
                />
            </g>
        );
    }

    private onChangeRangeHandler(value: number) {
        this.setState({
            ...this.state,
            range: value,
        });
    }

    private onChangeZoomHandler(value: number) {
        this.setState({
            ...this.state,
            zoom: value,
        });
    }

    private onToggleOverlayHandler(value: OverlayType) {
        const overlays = this.state.overlays;
        overlays[value] = !overlays[value];

        this.setState({
            ...this.state,
            overlays: overlays,
        });
    }
}
