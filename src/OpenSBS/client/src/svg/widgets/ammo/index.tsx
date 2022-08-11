import * as React from 'react';
import {connect} from 'react-redux';
import SvgTransforms from 'lib/svgTransforms';
import Item from 'models/item';
import ItemStack from 'models/itemStack';
import ItemStorage from 'models/itemStorage';
import CargoService from 'modules/cargo/cargoService';
import PanelElement from 'svg/elements/panelElement';
import ClientSelectors from 'store/client/clientSelectors';
import {selectAmmo, resetAmmo} from 'store/client/clientSlice';
import SpaceshipSelectors from 'store/spaceship/spaceshipSelectors';
import ColorPalette from 'svg/colorPalette';
import AmmoRowElement from 'svg/widgets/ammo/ammoRowElement';

interface AmmoWidgetProps {
    x: number,
    y: number,
    selectedAmmo: Item | null,
    cargo: ItemStorage | undefined,
    dispatch: any,
}

class AmmoWidget extends React.Component<AmmoWidgetProps, {}> {
    private readonly translation: string;

    constructor(props: AmmoWidgetProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.onAmmoClick = this.onAmmoClick.bind(this);
    }

    public render() {
        const rows = CargoService.findItems(this.props.cargo, 'ammo').map(
            (value: ItemStack, index: number) => this.renderRow(value, index)
        );

        return (
            <PanelElement
                x={this.props.x} y={this.props.y}
                width={450} height={270}
                isOffline={!this.props.cargo}
            >
                <text
                    x="20" y="15"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.HEADER}
                >AMMUNITION</text>
                <text
                    x="340" y="15"
                    fontSize="1rem" textAnchor="end"
                    fill={ColorPalette.HEADER}
                >TYPE</text>
                <text
                    x="400" y="15"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >QUANTITY</text>
                {rows}
                <line
                    x1="350" y1="0"
                    x2="350" y2="270"
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                />
            </PanelElement>
        );
    }

    private renderRow(stack: ItemStack, index: number) {
        return (
            <AmmoRowElement
                key={`ammo-row-${stack.item.id}`}
                x={0} y={30 + (40 * index)}
                item={stack.item}
                quantity={stack.quantity}
                selected={stack.item.id === this.props.selectedAmmo?.id}
                onClick={this.onAmmoClick}
            />
        );
    }

    private onAmmoClick(ammo: Item) {
        if (ammo.id === this.props.selectedAmmo?.id) {
            this.props.dispatch(resetAmmo());
        } else {
            this.props.dispatch(selectAmmo(ammo));
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        selectedAmmo: ClientSelectors.getSelectedAmmo(state),
        cargo: SpaceshipSelectors.getCargo(state),
    };
};

export default connect(mapStateToProps)(AmmoWidget);
