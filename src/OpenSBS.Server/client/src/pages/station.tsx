import * as React from 'react';
import Svg from './../elements/svg'
import Navigation from "../stations/navigation";

class Station extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Svg>
                    <Navigation/>
                </Svg>
            </div>
        );
    }
}

export default Station;
