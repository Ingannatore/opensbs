import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "../../elements/container";
import Text from "../../elements/text";
import RadarState from "./state";
import ZoomControls from "./zoom";
import CompassRing from "./compass";

class Radar extends Component {
    render() {
        const markerValue = this.props.range / 5;

        return (
            <Container id="widget-radar" size="500" x={this.props.x} y={this.props.y}>
                <CompassRing/>

                <circle cx="0" cy="0" r="92" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="184" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="276" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="368" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>

                <Text x="94" y="-8" size="1" fill="#2a363c" anchor="start">
                    {markerValue.toFixed(1)}km
                </Text>
                <Text x="186" y="-8" size="1" fill="#2a363c" anchor="start">
                    {(markerValue * 2).toFixed(1)}km
                </Text>
                <Text x="278" y="-8" size="1" fill="#2a363c" anchor="start">
                    {(markerValue * 3).toFixed(1)}km
                </Text>
                <Text x="370" y="-8" size="1" fill="#2a363c" anchor="start">
                    {(markerValue * 4).toFixed(1)}km
                </Text>

                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(30)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(60)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1" transform="rotate(90)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(120)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(150)"/>

                {this.renderMyShip()}
                <ZoomControls x="420" y="420"/>
            </Container>
        );
    }

    renderMyShip() {
        const transform = this.props.range < 5 ? 'scale(.5)' : '';
        return(
            <g id="widget-radar-myship" transform={transform}>
                <path d="M 0 -6 L 6 6 L 0 3 L -6 6 Z" stroke="white" strokeWidth="1" fill="white"/>
            </g>
        );
    }
}

const mapStateToProps = state => {
    return {
        range: state.radarReducer[RadarState.Keys.RANGE]
    }
};

export default connect(mapStateToProps)(Radar);
