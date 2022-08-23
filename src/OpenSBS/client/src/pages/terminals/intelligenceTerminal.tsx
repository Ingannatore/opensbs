import * as React from 'react';
import SvgElement from 'svg/elements/svgElement';
import TerminalElement from 'svg/elements/terminalElement';
import ScannerWidget from 'svg/widgets/scanner';
import TargetWidget from 'svg/widgets/target';
import TargetsWidget from 'svg/widgets/targets';
import 'pages/terminals/terminal.css';

export default class IntelligenceTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="INTELLIGENCE" icon="terminal.intelligence">
                    <ScannerWidget x={460} y={40}/>

                    <TargetWidget x={1480} y={80}/>
                    <TargetsWidget x={1480} y={490} maxItems={16}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
