import React, {Component} from 'react';
import {connect} from "react-redux";
import Display from "../elements/display";

class Bearing extends Component {
    render() {
        const textBearing = ('000' + Math.trunc(this.props.bearing)).slice(-3);

        return (
            <Display id="display-bearing" x={this.props.x} y={this.props.y} size="80" title="bearing" subtitle="degrees">
                {textBearing}
            </Display>
        );
    }
}

const mapStateToProps = state => {
    return {
        bearing: state.stateReducer['ship.bearing'] || '0'
    }
};

export default connect(mapStateToProps)(Bearing);
