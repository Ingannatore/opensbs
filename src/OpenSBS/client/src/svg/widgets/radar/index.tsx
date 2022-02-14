import * as React from 'react';
import {connect} from 'react-redux';
import SwitchElement from '../../elements/switchElement';
import PanelElement from '../../elements/panelElement';
import ShipElement from '../../elements/shipElement';
import ZoomControls from '../../commons/zoomControls';
import DistancesOverlay from '../../commons/distancesOverlay';
import SidesElement from '../../elements/sidesElement';
import TracesOverlay from './tracesOverlay';
import ColorPalette from '../../colorPalette';
import GroupLabel from '../../elements/groupLabel';

interface RadarWidgetProps {
    x: number,
    y: number,
}

interface RadarWidgetState {
    zoom: number,
    showDistancesOverlay: boolean,
    showSidesOverlay: boolean,
}

class RadarWidget extends React.Component<RadarWidgetProps, RadarWidgetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            zoom: 1,
            showDistancesOverlay: true,
            showSidesOverlay: true,
        };

        this.setZoom = this.setZoom.bind(this);
        this.toggleDistancesOverlay = this.toggleDistancesOverlay.bind(this);
        this.toggleSidesOverlay = this.toggleSidesOverlay.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                {
                    this.state.showDistancesOverlay &&
                    <DistancesOverlay
                        x={500} y={500} r={460}
                        scale={this.state.zoom}
                        range={10000}
                    />
                }
                {
                    this.state.showSidesOverlay &&
                    <SidesElement x={500} y={500} r={460}/>
                }

                <ShipElement x={500} y={500}/>
                <TracesOverlay x={500} y={500} r={460} scale={this.state.zoom} range={10000}/>
                <ZoomControls x={770} y={950} zoom={this.state.zoom} onChangeZoom={this.setZoom}/>

                <g transform="translate(10 950)">
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

export default connect()(RadarWidget);
