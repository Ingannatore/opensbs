import React, {Component} from 'react';
import Container from "../../elements/container";
import CompassRing from "./compass";
import DirectionsMarkers from "./directions";
import ModeControls from "./mode";
import RangeMarkers from "./ranges";
import ZoomControls from "./zoom";
import ShipMarker from "./ship";

class Radar extends Component {
    render() {
        return (
            <Container id="widget-radar" size="500" x={this.props.x} y={this.props.y}>
                <CompassRing/>
                <DirectionsMarkers/>
                <RangeMarkers/>
                <ModeControls/>
                <ZoomControls/>
                <ShipMarker/>
            </Container>
        );
    }
}

export default Radar;
