import React, {Component} from 'react'
import Station from "../elements/station";
import Helm from "../widgets/helm";
import Footer from "../elements/footer";
import Radar from "../widgets/radar";
import Bearing from "../widgets/bearing";

class Navigation extends Component {
    render() {
        return (
            <Station id="helm">
                <Helm x="230" y="800"/>
                <Bearing x="540" y="100"/>
                <Radar x="960" y="520"/>

                <Footer>
                    <text x="960" y="21" textAnchor="middle" fontSize="1.5rem" fill="white">navigation</text>
                    <g transform="translate(960, 3) rotate(180)">
                        <path d="M 0 -3 L 3 3 L -3 3 Z" stroke="#36424a" strokeWidth="1" fill="#36424a"/>
                    </g>
                </Footer>
            </Station>
        );
    }
}

export default Navigation;
