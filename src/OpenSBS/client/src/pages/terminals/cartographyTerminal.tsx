import * as React from 'react';
import SvgElement from '../../svg/elements/svgElement';
import TerminalElement from '../../svg/elements/terminalElement';
import MapWidget from '../../svg/widgets/map';
import MapControlsWidget from '../../svg/widgets/mapControls';
import './terminal.css';

export default class CartographyTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="CARTOGRAPHY" icon="terminal.cartography">
                    <MapControlsWidget x={-10} y={730}/>
                    <MapWidget x={460} y={40}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
