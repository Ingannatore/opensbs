import * as React from 'react';
import Icons from '../../../lib/icons';
import SvgTransforms from '../../../lib/svgTransforms';
import Item from '../../../models/item';
import ColorPalette from '../../colorPalette';

interface AmmoRowElementProps {
    x: number,
    y: number,
    item: Item,
    quantity: number,
    selected: boolean,
    onClick: (item: Item) => void,
}

export default class AmmoRowElement extends React.Component<AmmoRowElementProps, {}> {
    public render() {
        return (
            <g
                transform={SvgTransforms.translate(this.props.x, this.props.y)}
                cursor="pointer"
                onClick={() => this.props.onClick(this.props.item)}
            >
                <rect
                    x="1" y="1"
                    width="448" height="38"
                    stroke="none"
                    fill={this.props.selected ? ColorPalette.MUTE_DARK : ColorPalette.BACKGROUND}
                />
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                />
                <text
                    x="20" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.item.name}</text>
                <text
                    x="310" y="20"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >{AmmoRowElement.getTypeName(this.props.item.type)}</text>
                <use
                    x="315" y="5"
                    href={Icons.forItem(this.props.item.type)}
                    stroke={ColorPalette.TEXT}
                />
                <text
                    x="400" y="20"
                    fontSize="1.5rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.quantity}</text>
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
}
