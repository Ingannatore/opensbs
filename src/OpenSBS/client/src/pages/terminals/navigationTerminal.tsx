import 'pages/terminals/terminal.css';
import * as React from 'react';
import SvgElement from 'svg/elements/svgElement';
import TerminalElement from 'svg/elements/terminalElement';
import EngineWidget from 'svg/widgets/engine';
import HelmWidget from 'svg/widgets/helm';
import NavScannerWidget from 'svg/widgets/scanner/navScannerWidget';

export default class NavigationTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="NAVIGATION" icon="terminal.navigation">
                    <EngineWidget x={-10} y={390}/>

                    <NavScannerWidget x={460} y={40}/>

                    <HelmWidget x={1480} y={760}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
