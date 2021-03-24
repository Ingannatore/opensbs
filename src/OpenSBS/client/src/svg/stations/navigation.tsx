import * as React from 'react';
import StationElement from '../elements/station.element';
import RadarWidget from '../widgets/radar';
import EngineWidget from '../widgets/engine';
import FtlWidget from '../widgets/ftl';
import HelmWidget from '../widgets/helm';
import CompassRadialWidget from '../widgets/compass/compass-radial.widget';

export default class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <StationElement name="NAVIGATION" icon="#icon-navigation">
                <FtlWidget x={110} y={460}/>
                <EngineWidget x={330} y={460}/>

                <CompassRadialWidget x={960} y={540}/>
                <RadarWidget x={490} y={70}/>

                <HelmWidget x={1700} y={850}/>
            </StationElement>
        );
    }
}
