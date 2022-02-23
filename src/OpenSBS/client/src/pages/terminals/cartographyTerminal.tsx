import * as React from 'react';
import SvgElement from '../../svg/elements/svgElement';
import TerminalElement from '../../svg/elements/terminalElement';
import SectorsWidget from '../../svg/widgets/sectors';
import './terminal.css';

export default class CartographyTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="CARTOGRAPHY" icon="terminal.cartography">
                    <SectorsWidget x={-10} y={80}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
