import React, {Component} from 'react';
import Container from "../../elements/container";
import DirectionsMarkers from "./directions";
import ModeControls from "./mode";
import RangeMarkers from "./ranges";
import ZoomControls from "./zoom";
import ShipMarker from "./ship";
import Bezel from "../../elements/bezel";

class Radar extends Component {
    render() {
        return (
            <Container size="500" x={this.props.x} y={this.props.y}>
                <Bezel size={460} rotation={this.props.bearing} interval={5} majorInterval={15}/>
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
