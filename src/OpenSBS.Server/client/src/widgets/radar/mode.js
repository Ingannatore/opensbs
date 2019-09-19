import React, {Component} from 'react';
import Button from "../../elements/button";
import Actions from "./actions";
import RadarState from "./state";
import {connect} from "react-redux";

class ModeControls extends Component {
    constructor(props) {
        super(props);

        this.toggleDirectionsMarkers = this.toggleDirectionsMarkers.bind(this);
        this.toggleRangeMarkers = this.toggleRangeMarkers.bind(this);
        this.toggleTextMarkers = this.toggleTextMarkers.bind(this);
        this.toggleWeaponsMarkers = this.toggleWeaponsMarkers.bind(this);
    }

    render() {
        return (
            <g id="widget-radar-mode">
                <Button x="0" y="542" size="30" rotation="60" toggled={this.props.directionsMarkers} onClick={this.toggleDirectionsMarkers}>DIR</Button>
                <Button x="0" y="542" size="30" rotation="50" toggled={this.props.rangeMarkers} onClick={this.toggleRangeMarkers}>RNG</Button>
                <Button x="0" y="542" size="30" rotation="40" toggled={this.props.textMarkers} onClick={this.toggleTextMarkers}>TXT</Button>
                <Button x="0" y="542" size="30" rotation="30" toggled={this.props.weaponsMarkers} onClick={this.toggleWeaponsMarkers}>WPN</Button>
            </g>
        );
    }

    toggleDirectionsMarkers() {
        this.props.dispatch(Actions.toggleDirectionsMarkers());
    }

    toggleRangeMarkers() {
        this.props.dispatch(Actions.toggleRangeMarkers());
    }

    toggleTextMarkers() {
        this.props.dispatch(Actions.toggleTextMarkers());
    }

    toggleWeaponsMarkers() {
        this.props.dispatch(Actions.toggleWeaponsMarkers());
    }
}

const mapStateToProps = state => {
    return {
        directionsMarkers: state.radarReducer[RadarState.Keys.DIRECTIONS_MARKERS],
        rangeMarkers: state.radarReducer[RadarState.Keys.RANGE_MARKERS],
        textMarkers: state.radarReducer[RadarState.Keys.TEXT_MARKERS],
        weaponsMarkers: state.radarReducer[RadarState.Keys.WEAPONS_MARKERS]
    }
};

export default connect(mapStateToProps)(ModeControls);
