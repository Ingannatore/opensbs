import React, {Component} from 'react'
import SvgContainer from './ui/SvgContainer'
import SvgDefinitions from './ui/SvgDefinitions'
import Rudder from './widgets/Rudder'
import StationComponent from "./components/StationComponent";

class App extends Component {
    render() {
        return (
            <div>
                <Rudder/>
                <SvgContainer>
                    <SvgDefinitions/>
                    <StationComponent/>
                </SvgContainer>
            </div>
        );
    }
}

export default App;
