import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import ColorPalette from '../../color-palette';

interface ShieldCapacityProps {
    x: number,
    y: number,
    base: number,
    current: number,
}

export default class ShieldCapacityElement extends React.Component<ShieldCapacityProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldCapacityProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const ratio = this.props.current / this.props.base;
        const rectHeight = Math.round(200 * ratio);
        const rectTop = 202 - rectHeight;

        return (
            <g transform={this.translation}>
                <rect
                    x="0" y="0"
                    width="20" height="204"
                    stroke={ColorPalette.MUTE_LIGHT}
                    rx="4" ry="4"
                />
                <rect
                    x="2" y={rectTop}
                    width="16" height={rectHeight}
                    fill={ColorPalette.FILLER}
                    rx="3" ry="3"
                />
                <line x1="-4" y1="22" x2="-8" y2="22" stroke={ColorPalette.TEXT} strokeWidth="2"/>
                <text x="-4" y="42" fontSize="1rem" fill={ColorPalette.TEXT} textAnchor="end">80</text>
                <line x1="-4" y1="62" x2="-8" y2="62" stroke={ColorPalette.TEXT} strokeWidth="2"/>
                <text x="-4" y="82" fontSize="1rem" fill={ColorPalette.TEXT} textAnchor="end">60</text>
                <line x1="-4" y1="102" x2="-8" y2="102" stroke={ColorPalette.TEXT} strokeWidth="2"/>
                <text x="-4" y="122" fontSize="1rem" fill={ColorPalette.TEXT} textAnchor="end">40</text>
                <line x1="-4" y1="142" x2="-8" y2="142" stroke={ColorPalette.TEXT} strokeWidth="2"/>
                <text x="-4" y="162" fontSize="1rem" fill={ColorPalette.TEXT} textAnchor="end">20</text>
                <line x1="-4" y1="182" x2="-8" y2="182" stroke={ColorPalette.TEXT} strokeWidth="2"/>
            </g>
        );
    }
}
