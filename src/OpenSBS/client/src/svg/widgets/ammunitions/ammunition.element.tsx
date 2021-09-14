import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import ColorPalette from '../../color-palette';
import SwitchElement from '../../elements/switch.element';

interface AmmunitionElementProps {
    x: number,
    y: number,
    name: string,
    type: string,
    quantity: number,
    isSelected: boolean,
    onClick: () => void,
}

export default class AmmunitionElement extends React.Component<AmmunitionElementProps, {}> {
    private readonly translation: string;
    private readonly typeName: string;

    constructor(props: AmmunitionElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.typeName = AmmunitionElement.getTypeName(props.type);
    }

    public render() {
        const icon = `/images/icons.svg#${this.props.type}`;
        const typeName = AmmunitionElement.getTypeName(this.props.type);

        return (
            <g transform={this.translation} key={'item-' + this.props.type}>
                <line
                    x1="0" y1="0"
                    x2="450" y2="0"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="2"
                />

                <text
                    x="20" y="20"
                    fontSize="1.5rem" textAnchor="start"
                    fill={ColorPalette.TEXT}
                >{this.props.name}</text>
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
                >{this.props.quantity}</text>

                <SwitchElement
                    x={420} y={10}
                    width={20} height={20}
                    onClick={this.props.onClick}
                    toggled={this.props.isSelected}
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
}
