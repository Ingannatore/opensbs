import * as React from 'react';
import SvgElement from '../../svg/elements/svg.element';
import TerminalElement from '../../svg/elements/terminal.element';
import WeaponWidget from '../../svg/widgets/weapon';
import RadarWidget from '../../svg/widgets/radar';
import TargetsWidget from '../../svg/widgets/targets';
import AmmunitionsWidget from '../../svg/widgets/ammunitions';
import ShieldWidget from '../../svg/widgets/shields';
import './terminal.css';

export default class TacticalTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="TACTICAL" icon="icon-target">
                    <AmmunitionsWidget x={-10} y={80}/>
                    <WeaponWidget x={-10} y={490} index={3}/>
                    <WeaponWidget x={-10} y={620} index={2}/>
                    <WeaponWidget x={-10} y={750} index={1}/>
                    <WeaponWidget x={-10} y={880} index={0}/>
                    <RadarWidget x={460} y={40}/>
                    <ShieldWidget x={1480} y={80}/>
                    <TargetsWidget x={1480} y={570}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
