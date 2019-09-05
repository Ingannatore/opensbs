import React, {Component} from 'react'
import Compass from '../widgets/Compass'
import StationBackground from "../ui/StationBackground";

class StationComponent extends Component {
    render() {
        return (
            <g id="StationComponent">
                <StationBackground/>
                <Compass x="240" y="240"/>
            </g>
        );
    }
}

export default StationComponent;
