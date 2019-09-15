import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "../../elements/container";
import Display from "../../elements/display";

class Compass extends Component {
    render() {
        const textBearing = ('000' + Math.trunc(this.props.bearing)).slice(-3);
        const rotation = `rotate(${-(Math.trunc(this.props.bearing))}, 0, 0)`;

        return (
            <Container id="widget-compass" size="220" x={this.props.x} y={this.props.y}>
                <Display id="display-bearing" size="120" title="bearing" subtitle="degrees">{textBearing}</Display>
                <line x1="0" y1="-121" x2="0" y2="-215" stroke="#33393d"/>
                <circle cx="0" cy="0" r="150" stroke="#c0daf1" strokeWidth="2" fill="none"/>
                <g transform={rotation}>
                    {Compass.renderMarkers()}
                </g>
            </Container>
        );
    }

    static renderMarkers() {
        let markers = [];
        for (let i = 0; i < 360; i += 10) {
            let isMayorMarker = i % 30 === 0;
            let endY = isMayorMarker ? -168 : -160;
            let strokeWidth = isMayorMarker ? 2 : 1;
            markers.push(
                <line key={`linemarker${i}`} x1="0" y1="-150" x2="0" y2={endY} stroke="#c0daf1" strokeWidth={strokeWidth} transform={`rotate(${i}, 0, 0)`}/>
            );

            if (isMayorMarker) {
                markers.push(
                    <text key={`numbermarker${i}`} x="0" y="-186" textAnchor="middle" fontSize="1.4rem" transform={`rotate(${i}, 0, 0)`} fill="#76797c">{i}</text>
                );
            }
        }

        return markers;
    }
}

const mapStateToProps = state => {
    return {
        bearing: state['ship.bearing'] || '0'
    }
};

export default connect(mapStateToProps)(Compass);
