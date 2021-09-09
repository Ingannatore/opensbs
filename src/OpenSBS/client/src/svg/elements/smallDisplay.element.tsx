import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import ColorPalette from '../color-palette';

interface SmallDisplayElementProps {
    x: number,
    y: number,
    label: string,
}

export default class SmallDisplayElement extends React.Component<SmallDisplayElementProps, {}> {
    private readonly translation: string;

    constructor(props: SmallDisplayElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="-6"
                    fontSize="1.75rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.children}</text>
                <text
                    x="0" y="16"
                    fontSize="0.75rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.label}</text>
            </g>
        );
    }
}
