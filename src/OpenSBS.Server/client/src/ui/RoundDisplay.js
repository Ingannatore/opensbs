import React, {Component} from 'react';

class RoundDisplay extends Component {
    render() {
        return (
            <g id="ui-display-round">
                <circle cx="0" cy="0" r={this.props.size} stroke="none" className="fill-darker-blue"/>
                <circle cx="0" cy="0" r={this.props.size} stroke="#33393d" strokeWidth="2" fill="none"/>
                <circle cx="0" cy="0" r={+this.props.size - 4} stroke="#85888a" fill="none"/>
                <text x="0" y="-70" textAnchor="middle" fontSize={(+this.props.size / 86).toFixed(1) + "rem"}>{this.props.title}</text>
                <text x="0" y="0" textAnchor="middle" fontSize={(+this.props.size / 20).toFixed(1) + "rem"} className="text-white">{this.props.value}</text>
                <text x="0" y="60" textAnchor="middle" fontSize={(+this.props.size / 120).toFixed(1) + "rem"}>{this.props.subtitle}</text>
            </g>
        );
    }
}

export default RoundDisplay;
