import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface ValueProps {
    x: number,
    y: number,
    fontSize: number,
    label: string | undefined,
}

export default class ValueElement extends React.Component<ValueProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        fontSize: 1.5,
        label: undefined,
    };

    constructor(props: ValueProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="-15"
                    fontSize={this.props.fontSize + 'rem'} textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.children}</text>
                {this.props.label && <text
                    x="0" y="10"
                    fontSize="0.75rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.label}</text>}
            </g>
        );
    }
}
