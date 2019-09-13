import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "../elements/container";
import Text from "../elements/text";
import Button from "../elements/button";
import Display from "../elements/display";

class Radar extends Component {
    constructor(props) {
        super(props);

        this.state = { resolution: 0 };
        this.resolutions = [10, 7.5, 5, 2];
        this.increaseZoom = this.increaseZoom.bind(this);
        this.decreaseZoom = this.decreaseZoom.bind(this);
    }

    increaseZoom() {
        this.setState({resolution: Math.min(3, this.state.resolution + 1)});
    }

    decreaseZoom() {
        this.setState({resolution: Math.max(0, this.state.resolution - 1)});
    }

    render() {
        const markerValue = this.resolutions[this.state.resolution] / 5;

        return (
            <Container id="widget-radar" size="500" x={this.props.x} y={this.props.y}>
                {this.renderCompass()}

                <circle cx="0" cy="0" r="92" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="184" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="276" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="368" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>

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

                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(30)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(60)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1" transform="rotate(90)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(120)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(150)"/>

                {this.renderMyShip()}
                {this.renderZoomControls()}
            </Container>
        );
    }

    renderCompass() {
        const rotation = `rotate(${-(Math.trunc(this.props.bearing))}, 0, 0)`;

        return(
            <g id="widget-radar-compass">
                <circle cx="0" cy="0" r="478" fill="none" stroke="#2a363c" strokeWidth="3" strokeDasharray="4 6"/>
                <g transform={rotation}>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff">0</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(30)">030</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(60)">060</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(90)">090</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(120)">120</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(150)">150</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(180)">180</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(210)">210</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(240)">240</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(270)">270</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(300)">300</Text>
                    <Text x="0" y="-479" size="1.4" fill="#ffffff" transform="rotate(330)">330</Text>
                </g>
                <circle cx="0" cy="0" r="460" stroke="#2a363c" fill="none"/>
            </g>
        );
    }

    renderZoomControls() {
        return(
            <g id="widget-radar-zoom">
                <Display id="display-bearing" x="420" y="420" size="80" title="radar range" subtitle="kilometers">
                    {(this.resolutions[this.state.resolution])}
                </Display>
                <Button x="470" y="310" size="30" fontSize="2" onClick={this.increaseZoom}>-</Button>
                <Button x="310" y="470" size="30" fontSize="2" onClick={this.decreaseZoom}>+</Button>
            </g>
        );
    }

    renderMyShip() {
        const transform = this.state.resolution > 2 ? 'scale(.5)' : '';
        return(
            <g id="widget-radar-myship" transform={transform}>
                <path d="M 0 -6 L 6 6 L 0 3 L -6 6 Z" stroke="white" strokeWidth="1" fill="white"/>
            </g>
        );
    }
}

const mapStateToProps = state => {
    return {
        bearing: state['ship.bearing'] || '0'
    }
};

export default connect(mapStateToProps)(Radar);
