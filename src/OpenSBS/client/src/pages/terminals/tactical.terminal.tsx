import * as React from 'react';
import SvgElement from '../../svg/elements/svg.element';
import TerminalElement from '../../svg/elements/terminal.element';
import RadarWidget from '../../svg/widgets/radar';
import TargetsWidget from '../../svg/widgets/targets';
import AmmunitionsWidget from '../../svg/widgets/ammunitions';
import ShieldWidget from '../../svg/widgets/shields';
import WeaponsWidget from '../../svg/widgets/weapons';
import './terminal.css';

export default class TacticalTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="TACTICAL" icon="icon-target">
                    <AmmunitionsWidget x={-10} y={80}/>
                    <WeaponsWidget x={-10} y={370}/>
                    <RadarWidget x={460} y={40}/>
                    <ShieldWidget x={1480} y={80}/>
                    <TargetsWidget x={1480} y={570}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
