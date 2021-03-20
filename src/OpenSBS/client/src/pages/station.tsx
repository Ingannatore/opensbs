import * as React from 'react';
import SvgElement from '../svg/elements/svg.element'
import Navigation from '../svg/stations/navigation';

class Station extends React.Component<{}, {}> {
    render() {
        return (
            <SvgElement>
                <Navigation/>
            </SvgElement>
        );
    }
}

export default Station;
