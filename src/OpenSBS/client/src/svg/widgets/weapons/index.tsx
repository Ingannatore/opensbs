import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import PanelElement from '../../elements/panel.element';
import WeaponWidget from '../weapon/index';
import ColorPalette from '../../color-palette';

interface WeaponsProps {
    x: number,
    y: number,
}

class WeaponsWidget extends React.Component<WeaponsProps, {}> {
    private readonly translation: string;

    constructor(props: WeaponsProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={630}>
                <line x1="120" y1="0" x2="120" y2="630" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                <line x1="230" y1="0" x2="230" y2="630" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                <line x1="340" y1="0" x2="340" y2="630" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>

                <WeaponWidget x={340} y={0} index={0}/>
                <WeaponWidget x={230} y={0} index={1}/>
            </PanelElement>
        );
    }
}

export default connect()(WeaponsWidget);
