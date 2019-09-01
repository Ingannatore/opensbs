import React, {Component} from 'react';

class RoundContainer extends Component {
    render() {
        return (
            <g className="ui-container-round">
                <circle cx="0" cy="0" r={this.props.size} stroke="none" className="fill-darker-blue"/>
                <circle cx="0" cy="0" r={this.props.size} stroke="#36424a" fill="none"/>
                <circle cx="0" cy="0" r={+this.props.size - 4} stroke="#2a363c" fill="none"/>
            </g>
        );
    }
}

export default RoundContainer;
