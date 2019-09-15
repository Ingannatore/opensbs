import React, {Component} from 'react'
import Svg from './elements/svg'
import Helm from "./stations/helm";

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
