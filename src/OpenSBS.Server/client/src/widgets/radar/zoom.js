import React, {Component} from 'react';
import Display from "../../elements/display";
import Button from "../../elements/button";
import Actions from "./actions";
import RadarState from "./state";
import {connect} from "react-redux";

class ZoomControls extends Component {
    constructor(props) {
        super(props);

        this.translation = `translate(${this.props.x || 0} ${this.props.y || 0})`;
        this.increaseZoom = this.increaseZoom.bind(this);
        this.decreaseZoom = this.decreaseZoom.bind(this);
    }

    render() {
        return(
            <g id="widget-radar-zoom" transform={this.translation}>
                <Display x="420" y="420" id="display-range" size="80" title="radar range" subtitle="kilometers">
                    {this.props.range}
                </Display>
                <Button x="0" y="542" size="30" fontSize="2" rotation="-60" onClick={this.increaseZoom}>-</Button>
                <Button x="0" y="542" size="30" fontSize="2" rotation="-30" onClick={this.decreaseZoom}>+</Button>
            </g>
        );
    }

    increaseZoom() {
        this.props.dispatch(Actions.increaseZoom());
    }

    decreaseZoom() {
        this.props.dispatch(Actions.decreaseZoom());
    }
}

const mapStateToProps = state => {
    return {
        range: state.radarReducer[RadarState.Keys.RANGE]
    }
};

export default connect(mapStateToProps)(ZoomControls);
