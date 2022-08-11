import * as React from 'react';
import SvgElement from '../../svg/elements/svgElement';
import TerminalElement from '../../svg/elements/terminalElement';
import AmmoWidget from '../../svg/widgets/ammo';
import RadarWidget from '../../svg/widgets/radar';
import ShieldWidget from '../../svg/widgets/shields';
import TargetsWidget from '../../svg/widgets/targets';
import WeaponWidget from '../../svg/widgets/weapon';
import './terminal.css';

export default class TacticalTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="TACTICAL" icon="terminal.tactical">
                    <AmmoWidget x={-10} y={80}/>
                    <WeaponWidget x={-10} y={370} index={0}/>
                    <WeaponWidget x={-10} y={530} index={1}/>
                    <WeaponWidget x={-10} y={690} index={2}/>
                    <WeaponWidget x={-10} y={850} index={3}/>

                    <RadarWidget x={460} y={40}/>

                    <ShieldWidget x={1480} y={80}/>
                    <TargetsWidget x={1480} y={580} maxRange={10000}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
