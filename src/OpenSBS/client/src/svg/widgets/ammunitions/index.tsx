import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from '../../../lib/svgTransforms';
import PanelElement from '../../elements/panel.element';
import SpaceshipSelectors from '../../../store/spaceship/spaceshipSelectors';
import ItemStack from '../../../models/itemStack';
import ClientActions from '../../../store/client/clientActions';
import ClientSelectors from '../../../store/client/clientSelectors';
import Item from '../../../models/item';
import ItemStorage from '../../../models/itemStorage';
import SwitchElement from '../../elements/switch.element';
import CargoService from '../../../modules/cargo/cargoService';
import ColorPalette from '../../colorPalette';

interface AmmunitionsWidgetProps {
    x: number,
    y: number,
    dispatch: any,
    selectedAmmo: Item | null,
    cargo: ItemStorage | undefined,
}

class AmmunitionsWidget extends React.Component<AmmunitionsWidgetProps, {}> {
    private readonly translation: string;

    constructor(props: AmmunitionsWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onAmmoClick = this.onAmmoClick.bind(this);
    }

    public render() {
        const rows = CargoService.findItems(this.props.cargo, 'ammo').map(
            (value: ItemStack, index: number) => this.renderAmmoRow(value, index)
        );

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={270}
                isOffline={!this.props.cargo}
            >
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
                {rows}
            </PanelElement>
        );
    }

    private renderAmmoRow(stack: ItemStack, index: number) {
        const icon = `/images/icons.svg#${stack.item.type}`;
        const typeName = AmmunitionsWidget.getTypeName(stack.item.type);
        const transform = SvgTransforms.translate(0, 30 + (40 * index))

        return (
            <g transform={transform} key={`ammo-row-${stack.item.id}`}>
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />
                <text
                    x="20" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{stack.item.name}</text>
                <text
                    x="270" y="20"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{typeName}</text>
                <use href={icon} x="275" y="5" stroke={ColorPalette.TEXT}/>

                <text
                    x="360" y="20"
                    fontSize="1.5rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{stack.quantity}</text>

                <SwitchElement
                    x={420} y={10}
                    width={20} height={20}
                    toggled={stack.item.id === this.props.selectedAmmo?.id}
                    onClick={() => this.onAmmoClick(stack.item)}
                />
            </g>
        );
    }

    private static getTypeName(type: string): string {
        switch (type) {
            case 'ammo.plasma':
                return 'Plasma Charge';
            case 'ammo.projectile':
                return 'Artillery Shell';
            case 'ammo.torpedo':
                return 'Torpedo Warhead';
            default:
                return type;
        }
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
