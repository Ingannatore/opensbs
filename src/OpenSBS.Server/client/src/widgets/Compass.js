import React, {Component} from 'react';
import {connect} from 'react-redux'
import RoundContainer from "../ui/RoundContainer";
import RoundDisplay from "../ui/RoundDisplay";

class Compass extends Component {
    constructor(props) {
        super(props);

        this.translation = `translate(${this.props.x || 0} ${this.props.y || 0})`;
    }

    render() {
        const textBearing = ('000' + Math.trunc(this.props.bearing)).slice(-3);
        const rotation = `rotate(${-(Math.trunc(this.props.bearing))}, 0, 0)`;
        return (
            <g className="widget-compass" transform={this.translation}>
                <RoundContainer size="220"/>
                <RoundDisplay size="120" title="bearing" value={textBearing} subtitle="degrees"/>
                <line x1="0" y1="-121" x2="0" y2="-215" stroke="#33393d"/>
                <circle cx="0" cy="0" r="150" stroke="#c0daf1" strokeWidth="2" fill="none"/>
                <g transform={rotation}>
                    {Compass.renderLineMarkers()}
                    {Compass.renderNumberMarkers()}
                </g>
            </g>
        );
    }

    static renderLineMarkers() {
        let markers = [];
        for (let i = 0; i < 360; i += 10) {
            let endY = i % 30 === 0 ? -168 : -160;
            let strokeWidth = i % 30 === 0 ? 2 : 1;
            markers.push(
                <line key={`linemarker${i}`} x1="0" y1="-150" x2="0" y2={endY} stroke="#c0daf1" strokeWidth={strokeWidth} transform={`rotate(${i}, 0, 0)`}/>
            );
        }

        return markers;
    }

    static renderNumberMarkers() {
        let markers = [];
        for (let i = 0; i < 360; i += 30) {
            let className = i === 0 ? 'text-azure' : '';
            markers.push(
                <text key={`numbermarker${i}`} x="0" y="-186" textAnchor="middle" fontSize="1.4rem" transform={`rotate(${i}, 0, 0)`} className={className}>{i}</text>
            );
        }

        return markers;
    }
}

const mapStateToProps = state => {
    return {
        bearing: state['ship.bearing']
    }
};

export default connect(mapStateToProps)(Compass);
