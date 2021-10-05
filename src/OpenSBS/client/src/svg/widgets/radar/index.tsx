import * as React from 'react';
import {connect} from 'react-redux';
import DirectionsOverlayElement from './directionsOverlayElement';
import RangesOverlayElement from './rangesOverlayElement';
import TracesOverlayElement from './tracesOverlayElement';
import SwitchElement from '../../elements/switch.element';
import PanelElement from '../../elements/panel.element';
import TargetDistanceElement from './targetDistanceElement';
import RadarRangeElement from './radarRangeElement';
import ZoomElement from './zoomElement';
import ColorPalette from '../../colorPalette';

interface RadarWidgetProps {
    x: number,
    y: number,
}

interface RadarWidgetState {
    enableDirectionsOverlay: boolean,
    enableRangesOverlay: boolean,
}

class RadarWidget extends React.Component<RadarWidgetProps, RadarWidgetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            enableDirectionsOverlay: true,
            enableRangesOverlay: true,
        };

        this.toggleDirectionsOverlay = this.toggleDirectionsOverlay.bind(this);
        this.toggleRangesOverlay = this.toggleRangesOverlay.bind(this);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={1000} height={1000}>
                <TargetDistanceElement x={100} y={70}/>

                <g transform="translate(500 500)">
                    <circle
                        cx="0" cy="0" r="460"
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    />
                    <RangesOverlayElement visible={this.state.enableRangesOverlay}/>
                    <DirectionsOverlayElement r={460} visible={this.state.enableDirectionsOverlay}/>
                    <TracesOverlayElement size={400}/>
                    <use href="/images/icons.svg#icon-ship" x="-6" y="-6"/>
                </g>

                <RadarRangeElement x={900} y={920}/>
                <ZoomElement x={900} y={920}/>

                <g transform="translate(100 910)">
                    <g transform="translate(-60 0)">
                        <g transform="translate(-25 -25)">
                            <SwitchElement
                                x={0} y={0}
                                width={80} height={50} fontSize={1.25}
                                onClick={this.toggleRangesOverlay}
                                toggled={this.state.enableRangesOverlay}
                            >RANGE</SwitchElement>
                        </g>
                    </g>
                    <g transform="translate(5 -25)">
                        <SwitchElement
                            x={0} y={0}
                            width={80} height={50} fontSize={1.25}
                            onClick={this.toggleDirectionsOverlay}
                            toggled={this.state.enableDirectionsOverlay}
                        >SECTOR</SwitchElement>
                    </g>
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
}

export default connect()(RadarWidget);
