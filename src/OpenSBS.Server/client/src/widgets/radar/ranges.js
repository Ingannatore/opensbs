import React, {Component} from 'react';
import {connect} from "react-redux";
import Text from "../../elements/text";
import RadarState from "./state";

class RangeMarkers extends Component {
    render() {
        const markerValue = this.props.range / 5;
        let opacity = this.props.rangeMarkers ? '1' : '0.15';
        let textOpacity = this.props.textMarkers ? '1' : '0.15';

        return (
            <g id="widget-radar-markers-range" opacity={opacity}>
                <circle cx="0" cy="0" r="92" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="184" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="276" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="368" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>

                <g id="widget-radar-markers-range-text" opacity={textOpacity}>
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
                </g>
            </g>
        );
    }
}

const mapStateToProps = state => {
    return {
        range: state.radarReducer[RadarState.Keys.RANGE],
        rangeMarkers: state.radarReducer[RadarState.Keys.RANGE_MARKERS],
        textMarkers: state.radarReducer[RadarState.Keys.TEXT_MARKERS]
    }
};

export default connect(mapStateToProps)(RangeMarkers);
