import * as React from 'react';
import SvgRoot from '../svg/elements/svgRoot'
import Navigation from '../svg/stations/navigation';

class Station extends React.Component<{}, {}> {
    render() {
        return (
            <SvgRoot>
                <Navigation/>
            </SvgRoot>
        );
    }
}

export default Station;
