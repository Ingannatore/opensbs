﻿import * as React from 'react';
import SvgElement from '../../svg/elements/svg.element';
import TerminalElement from '../../svg/elements/terminal.element';
import RadarWidget from '../../svg/widgets/radar';
import TargetsWidget from '../../svg/widgets/targets';
import AmmunitionsWidget from '../../svg/widgets/ammunitions';
import ShieldWidget from '../../svg/widgets/shields';
import WeaponWidget from '../../svg/widgets/weapon';
import './terminal.css';

export default class TacticalTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="TACTICAL" icon="icon-target">
                    <AmmunitionsWidget x={-10} y={80}/>
                    <WeaponWidget x={-10} y={370} index={0}/>
                    <WeaponWidget x={-10} y={530} index={1}/>
                    <WeaponWidget x={-10} y={370} index={2}/>
                    <WeaponWidget x={-10} y={530} index={3}/>
                    <RadarWidget x={460} y={40}/>
                    <ShieldWidget x={1480} y={80}/>
                    <TargetsWidget x={1480} y={570}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}