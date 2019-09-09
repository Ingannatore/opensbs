import React, {Component} from 'react'
import Station from "./index";
import Compass from "../widgets/compass";

class Helm extends Component {
    render() {
        return (
            <Station id="helm">
                <Compass x="240" y="240"/>
            </Station>
        );
    }
}

export default Helm;
