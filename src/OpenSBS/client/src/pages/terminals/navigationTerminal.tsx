import * as React from 'react';
import SvgElement from 'svg/elements/svgElement';
import TerminalElement from 'svg/elements/terminalElement';
import EngineWidget from 'svg/widgets/engine';
import HelmWidget from 'svg/widgets/helm';
import RadarWidget from 'svg/widgets/radar';
import 'pages/terminals/terminal.css';

export default class NavigationTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="NAVIGATION" icon="terminal.navigation">
                    <EngineWidget x={-10} y={390}/>

                    <RadarWidget x={460} y={40}/>

                    <HelmWidget x={1480} y={760}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
