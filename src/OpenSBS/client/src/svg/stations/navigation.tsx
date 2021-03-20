import * as React from 'react';
import StationElement from '../elements/station.element';
import RadarWidget from '../widgets/radar';

export default class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <StationElement name="NAVIGATION" icon="#icon-navigation">
                <RadarWidget x={490} y={100}/>
            </StationElement>
        );
    }
}
