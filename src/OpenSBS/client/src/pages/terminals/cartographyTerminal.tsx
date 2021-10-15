import * as React from 'react';
import SvgElement from '../../svg/elements/svgElement';
import TerminalElement from '../../svg/elements/terminalElement';
import './terminal.css';

export default class CartographyTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="CARTOGRAPHY" icon="terminal.cartography">

                </TerminalElement>
            </SvgElement>
        );
    }
}
