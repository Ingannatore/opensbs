import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import ColorPalette from '../color-palette';

interface ValueProps {
    x: number,
    y: number,
    label: string | undefined,
}

export default class ValueElement extends React.Component<ValueProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
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
                    fontSize="1.5rem" textAnchor="middle"
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
