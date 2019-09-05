import React, {Component} from 'react'
import SvgContainer from './ui/SvgContainer'
import SvgDefinitions from './ui/SvgDefinitions'
import Compass from './widgets/Compass'
import Rudder from './widgets/Rudder'
import StationBackground from "./ui/StationBackground";

class App extends Component {
    render() {
        return (
            <div>
                <Rudder/>
                <SvgContainer>
                    <SvgDefinitions/>
                    <StationBackground/>
                    <Compass x="240" y="240"/>
                </SvgContainer>
            </div>
        );
    }
}

export default App;
