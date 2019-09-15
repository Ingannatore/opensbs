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
                <Display id="display-range" size="80" title="radar range" subtitle="kilometers">
                    {this.props.range}
                </Display>
                <Button x="50" y="-110" size="30" fontSize="2" onClick={this.increaseZoom}>-</Button>
                <Button x="-110" y="50" size="30" fontSize="2" onClick={this.decreaseZoom}>+</Button>
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
