import * as React from 'react';
import StationElement from '../elements/station.element';
import CompassWidget from '../widgets/compass.widget';
import RadarWidget from '../widgets/radar';
import EngineWidget from '../widgets/engine';
import FtlWidget from '../widgets/ftl';
import HelmWidget from '../widgets/helm';

export default class Navigation extends React.Component<{}, {}> {
    render() {
        return (
            <StationElement name="NAVIGATION" icon="#icon-navigation">
                <CompassWidget x={960} y={40}/>
                <RadarWidget x={490} y={100}/>
                <EngineWidget x={1560} y={190}/>
                <FtlWidget x={1800} y={190}/>
                <HelmWidget x={1680} y={970}/>
            </StationElement>
        );
    }
}
