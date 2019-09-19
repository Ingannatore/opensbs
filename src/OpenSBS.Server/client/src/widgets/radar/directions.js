import React, {Component} from 'react';
import RadarState from "./state";
import {connect} from "react-redux";

class DirectionsMarkers extends Component {
    render() {
        let opacity = this.props.directionsMarkers ? '1' : '0.15';

        return (
            <g id="widget-radar-markers-directions" opacity={opacity}>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(30)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(60)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1" transform="rotate(90)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(120)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(150)"/>
            </g>
        );
    }
}

const mapStateToProps = state => {
    return {
        directionsMarkers: state.radarReducer[RadarState.Keys.DIRECTIONS_MARKERS]
    }
};

export default connect(mapStateToProps)(DirectionsMarkers);
