import React, {Component} from 'react';
import {connect} from "react-redux";
import RadarState from "./state";

class ShipMarker extends Component {
    render() {
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

export default connect(mapStateToProps)(ShipMarker);
