import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import PanelElement from '../../elements/panelElement';
import ShipOverlay from './shipOverlay';
import TracesOverlay from './tracesOverlay';
import DistancesOverlay from '../../commons/distancesOverlay';
import ZoomControls from '../../commons/zoomControls';
import SidesOverlay from './sidesOverlay';
import SwitchElement from '../../elements/switchElement';
import GroupLabel from '../../elements/groupLabel';

interface ScannerWidgetProps {
    x: number,
    y: number,
}

interface ScannerWidgetState {
    zoom: number,
    showDistancesOverlay: boolean,
    showSidesOverlay: boolean,
}

export default class ScannerWidget extends React.Component<ScannerWidgetProps, ScannerWidgetState> {
    private readonly translation: string;

    constructor(props: ScannerWidgetProps) {
        super(props);
        this.state = {
            zoom: 1,
            showDistancesOverlay: true,
            showSidesOverlay: true,
        };

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.setZoom = this.setZoom.bind(this);
        this.toggleDistancesOverlay = this.toggleDistancesOverlay.bind(this);
        this.toggleSidesOverlay = this.toggleSidesOverlay.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                {
                    this.state.showDistancesOverlay &&
                    <DistancesOverlay x={500} y={500} r={490} scale={this.state.zoom}/>
                }
                {
                    this.state.showSidesOverlay &&
                    <SidesOverlay x={500} y={500} r={490}/>
                }
                <ShipOverlay x={500} y={500}/>
                <TracesOverlay x={500} y={500} r={490} scale={this.state.zoom}/>
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
