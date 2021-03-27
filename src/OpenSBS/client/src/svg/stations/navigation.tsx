import * as React from 'react';
import StationElement from '../elements/station.element';
import RadarWidget from '../widgets/radar';
import EngineWidget from '../widgets/engine';
import HelmWidget from '../widgets/helm';
import CompassRadialWidget from '../widgets/compass/compass-radial.widget';

export default class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <StationElement name="NAVIGATION TERMINAL" icon="#icon-navigation">
                <EngineWidget x={10} y={390}/>

                <RadarWidget x={460} y={40}/>
                <CompassRadialWidget x={960} y={540}/>

                <HelmWidget x={1480} y={700}/>
            </StationElement>
        );
    }
}
