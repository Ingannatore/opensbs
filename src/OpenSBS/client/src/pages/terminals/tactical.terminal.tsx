import * as React from 'react';
import SvgElement from '../../svg/elements/svg.element';
import TerminalElement from '../../svg/elements/terminal.element';
import WeaponWidget from '../../svg/widgets/weapon';
import './terminal.css';

export default class TacticalTerminal extends React.Component<{}, {}> {
    public render() {
        return (
            <SvgElement>
                <TerminalElement name="TACTICAL" icon="icon-target">
                    <WeaponWidget x={-10} y={360} index={4}/>
                    <WeaponWidget x={-10} y={490} index={3}/>
                    <WeaponWidget x={-10} y={620} index={2}/>
                    <WeaponWidget x={-10} y={750} index={1}/>
                    <WeaponWidget x={-10} y={880} index={0}/>
                </TerminalElement>
            </SvgElement>
        );
    }
}
