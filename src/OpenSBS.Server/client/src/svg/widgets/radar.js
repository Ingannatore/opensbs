import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "../elements/container";
import Text from "../elements/text";

class Radar extends Component {
    constructor(props) {
        super(props);

        this.state = { zoomFactor: 1 };
    }

    render() {
        const rotation = `rotate(${-(Math.trunc(this.props.bearing))}, 0, 0)`;

        return (
            <Container id="widget-radar" size="500" x={this.props.x} y={this.props.y}>
                <circle cx="0" cy="0" r="460" stroke="#2a363c" fill="none"/>
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

                <circle cx="0" cy="0" r="92" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="184" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="276" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>
                <circle cx="0" cy="0" r="368" stroke="#122127" strokeWidth="1" fill="none" strokeDasharray="4"/>

                <Text x="94" y="-8" size="1" fill="#2a363c" anchor="start">2km</Text>
                <Text x="186" y="-8" size="1" fill="#2a363c" anchor="start">4km</Text>
                <Text x="278" y="-8" size="1" fill="#2a363c" anchor="start">6km</Text>
                <Text x="370" y="-8" size="1" fill="#2a363c" anchor="start">8km</Text>

                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(30)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(60)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#2a363c" strokeWidth="1" transform="rotate(90)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(120)"/>
                <line x1="0" y1="-459" x2="0" y2="459" stroke="#122127" strokeWidth="1" transform="rotate(150)"/>

                <path d="M 0 -6 L 6 6 L 0 3 L -6 6 Z" stroke="white" strokeWidth="1" fill="white"/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        bearing: state['ship.bearing'] || '0'
    }
};

export default connect(mapStateToProps)(Radar);
