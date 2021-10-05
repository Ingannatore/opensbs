import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface DisplayElementProps {
    x: number,
    y: number,
    topLabel: string,
    bottomLabel: string | undefined,
}

export default class DisplayElement extends React.Component<DisplayElementProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        bottomLabel: undefined,
    };

    constructor(props: DisplayElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="0" y="-55"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.topLabel}</text>
                <text
                    x="0" y="0"
                    fontSize="4.5rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.children}</text>
                {this.props.bottomLabel && <text
                    x="0" y="55"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.bottomLabel}</text>}
            </g>
        );
    }
}
