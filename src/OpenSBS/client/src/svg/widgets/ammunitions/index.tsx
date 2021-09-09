import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svg-transforms';
import PanelElement from '../../elements/panel.element';
import ColorPalette from '../../color-palette';
import AmmunitionElement from './ammunition.element';

interface AmmunitionsPropsModel {
    x: number,
    y: number,
}

class AmmunitionsWidget extends React.Component<AmmunitionsPropsModel, {}> {
    private readonly translation: string;

    constructor(props: AmmunitionsPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={270}>
                <line x1="310" y1="0" x2="310" y2="270" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>
                <line x1="410" y1="0" x2="410" y2="270" stroke={ColorPalette.MUTE_DARK} strokeWidth="2"/>

                <text
                    x="20" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.HEADER}
                >AMMUNITION</text>
                <text
                    x="300" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >TYPE</text>
                <text
                    x="360" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >QUANTITY</text>

                <AmmunitionElement
                    x={0} y={30}
                    name="Argon" type="ammo.plasma"
                    quantity={99999}
                />
                <AmmunitionElement
                    x={0} y={70}
                    name="Xenon" type="ammo.plasma"
                    quantity={99999}
                />
                <AmmunitionElement
                    x={0} y={110}
                    name="Tungsten" type="ammo.projectile"
                    quantity={99999}
                />
                <AmmunitionElement
                    x={0} y={150}
                    name="Thermite" type="ammo.projectile"
                    quantity={99999}
                />
                <AmmunitionElement
                    x={0} y={190}
                    name="Electromagnetic" type="ammo.torpedo"
                    quantity={99999}
                />
                <AmmunitionElement
                    x={0} y={230}
                    name="Antimatter" type="ammo.torpedo"
                    quantity={99999}
                />
            </PanelElement>
        );
    }
}

export default connect()(AmmunitionsWidget);
