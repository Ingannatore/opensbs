import React, {Component} from 'react'
import Svg from './svg'
import Helm from "./svg/stations/helm";

class App extends Component {
    render() {
        return (
            <div>
                <Svg>
                    <Helm/>
                </Svg>
            </div>
        );
    }
}

export default App;
