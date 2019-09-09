import React, {Component} from 'react'
import Station from "./index";
import Compass from "../widgets/compass";
import Rudder from "../widgets/rudder";

class Helm extends Component {
    render() {
        return (
            <Station id="helm">
                <Compass x="240" y="240"/>
                <Rudder x="240" y="760"/>

                <line x1="0" y1="1020" x2="1920" y2="1020" stroke="#36424a" strokeWidth="1"/>
                <rect x="0" y="1021" width="1920" height="79" fill="#070d0f" opacity=".75" />

                <text x="760" y="1055" textAnchor="middle" fontSize="2rem" fill="#76797c">WRP</text>
                <text x="960" y="1055" textAnchor="middle" fontSize="2rem" fill="white">NAV</text>
                <text x="1160" y="1055" textAnchor="middle" fontSize="2rem" fill="#76797c">STA</text>

                <g transform="translate(960, 1025) rotate(180)">
                    <path d="M 0 -4 L 4 4 L -4 4 Z" stroke="#36424a" strokeWidth="1" fill="#36424a"/>
                </g>
            </Station>
        );
    }
}

export default Helm;
