import SensorsModule from 'modules/sensors/sensorsModule';
import SensorsService from 'modules/sensors/sensorsService';
import * as React from 'react';
import {connect} from 'react-redux';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import PanelElement from 'svg/elements/panelElement';
import ShipElement from 'svg/elements/shipElement';
import CompassBezel from 'svg/widgets/scanner/bezels/compassBezel';
import OverlaysControl from 'svg/widgets/scanner/controls/overlaysControl';
import RangeControl from 'svg/widgets/scanner/controls/rangeControl';
import ZoomControl from 'svg/widgets/scanner/controls/zoomControl';
import DistancesOverlay from 'svg/widgets/scanner/overlays/distancesOverlay';
import OverlayType from 'svg/widgets/scanner/overlays/overlayType';
import SidesOverlay from 'svg/widgets/scanner/overlays/sidesOverlay';
import TracesOverlay from 'svg/widgets/scanner/overlays/tracesOverlay';

interface NavScannerWidgetProps {
    x: number,
    y: number,
    bearing: number,
    sensors: SensorsModule | undefined,
}

interface NavScannerWidgetState {
    range: number,
    zoom: number,
    overlays: Record<OverlayType, boolean>,
}

class NavScannerWidget extends React.Component<NavScannerWidgetProps, NavScannerWidgetState> {
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
        };

        this.onChangeRangeHandler = this.onChangeRangeHandler.bind(this);
        this.onChangeZoomHandler = this.onChangeZoomHandler.bind(this);
        this.onToggleOverlayHandler = this.onToggleOverlayHandler.bind(this);
    }

    public render() {
        const effectiveRange = this.state.range * (1 / this.state.zoom);

        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000} isOffline={!this.props.sensors}>
                <RangeControl
                    x={120} y={30}
                    value={this.state.range} maxValue={this.props.sensors?.range || 0}
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
            </PanelElement>
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

const mapStateToProps = (state: any) => {
    return {
        bearing: SpaceshipSelectors.getBearing(state),
        sensors: SpaceshipSelectors.getSensors(state),
    };
};

export default connect(mapStateToProps)(NavScannerWidget);
