import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import ColorPalette from '../../color-palette';

interface WeaponNameProps {
    x: number,
    y: number,
}

export default class WeaponNameElement extends React.Component<WeaponNameProps, {}> {
    private readonly translation: string;

    constructor(props: WeaponNameProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const name = this.props.children?.toString() ?? '';
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="0"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{name.split(' ')[0]}</text>
                <text
                    x="0" y="20"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{name.split(' ')[1]}</text>
            </g>
        );
    }
}
