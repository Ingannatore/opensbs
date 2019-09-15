import React, {Component} from 'react';
import Text from "../../elements/text";
import {connect} from "react-redux";

class CompassRing extends Component {
    render() {
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
}

const mapStateToProps = state => {
    return {
        bearing: state.stateReducer['ship.bearing'] || '0'
    }
};

export default connect(mapStateToProps)(CompassRing);
