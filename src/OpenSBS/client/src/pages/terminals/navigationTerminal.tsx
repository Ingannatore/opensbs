import * as React from 'react';
import CompassRadialWidget from '../../svg/widgets/compass/compass-radial.widget';
import EngineWidget from '../../svg/widgets/engine';
import HelmWidget from '../../svg/widgets/helm';
import RadarWidget from '../../svg/widgets/radar';
import SvgElement from '../../svg/elements/svg.element';
import TerminalElement from '../../svg/elements/terminal.element';
import './terminal.css';

export default class NavigationTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="NAVIGATION" icon="icon-navigation">
                    <EngineWidget x={-10} y={390}/>

                    <RadarWidget x={460} y={40}/>
                    <CompassRadialWidget x={960} y={540}/>

                    <HelmWidget x={1480} y={700}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
