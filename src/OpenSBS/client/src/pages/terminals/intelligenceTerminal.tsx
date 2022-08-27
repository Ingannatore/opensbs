import * as React from 'react';
import SvgElement from 'svg/elements/svgElement';
import TerminalElement from 'svg/elements/terminalElement';
import AnalyzerWidget from 'svg/widgets/analyzer';
import TargetWidget from 'svg/widgets/target';
import 'pages/terminals/terminal.css';

export default class IntelligenceTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="INTELLIGENCE" icon="terminal.intelligence">
                    <AnalyzerWidget x={460} y={40}/>

                    <TargetWidget x={1480} y={80}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
