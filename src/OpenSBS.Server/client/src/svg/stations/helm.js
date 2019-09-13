import React, {Component} from 'react'
import Station from "./index";
import Rudder3D from "../widgets/rudder3d";
import Footer from "../elements/footer";
import Radar from "../widgets/radar";
import Bearing from "../widgets/bearing";

class Helm extends Component {
    render() {
        return (
            <Station id="helm">
                <Rudder3D x="240" y="800"/>
                <Bearing x="540" y="100"/>
                <Radar x="960" y="520"/>

                <Footer>
                    <text x="760" y="21" textAnchor="middle" fontSize="1.5rem" fill="#76797c">WRP</text>
                    <text x="960" y="21" textAnchor="middle" fontSize="1.5rem" fill="white">NAV</text>
                    <text x="1160" y="21" textAnchor="middle" fontSize="1.5rem" fill="#76797c">STA</text>

                    <g transform="translate(960, 3) rotate(180)">
                        <path d="M 0 -3 L 3 3 L -3 3 Z" stroke="#36424a" strokeWidth="1" fill="#36424a"/>
                    </g>
                </Footer>
            </Station>
        );
    }
}

export default Helm;
