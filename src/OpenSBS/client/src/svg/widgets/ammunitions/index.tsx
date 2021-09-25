import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import PanelElement from '../../elements/panel.element';
import AmmunitionElement from './ammunition.element';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ItemStack from '../../../models/itemStack';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import Item from '../../../models/item';
import ItemStorage from '../../../models/itemStorage';
import ColorPalette from '../../colorPalette';

interface AmmunitionsPropsModel {
    x: number,
    y: number,
    dispatch: any,
    selectedAmmo: Item | null,
    cargo: ItemStorage | undefined,
}

class AmmunitionsWidget extends React.Component<AmmunitionsPropsModel, {}> {
    private readonly translation: string;

    constructor(props: AmmunitionsPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onAmmoClick = this.onAmmoClick.bind(this);
    }

    public render() {
        if (!this.props.cargo) {
            return null;
        }

        const ammunitions = this.props.cargo.items.filter(
            (stack: ItemStack) => stack.item.type.startsWith('ammo.')
        );

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

                {ammunitions.map((value: ItemStack, index: number) => <AmmunitionElement
                    key={`ammo-element-${value.item.name.toLowerCase()}`}
                    x={0} y={30 + (40 * index)}
                    name={value.item.name} type={value.item.type}
                    quantity={value.quantity}
                    isSelected={value.item.id === this.props.selectedAmmo?.id}
                    onClick={() => this.onAmmoClick(value.item)}
                />)}
            </PanelElement>
        );
    }

    private onAmmoClick(ammo: Item) {
        if (ammo.id === this.props.selectedAmmo?.id) {
            this.props.dispatch(ClientActions.resetAmmo());
        } else {
            this.props.dispatch(ClientActions.setAmmo(ammo));
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        selectedAmmo: ClientSelectors.getSelectedAmmo(state),
        cargo: SpaceshipSelectors.getCargo(state),
    };
};

export default connect(mapStateToProps)(AmmunitionsWidget);
