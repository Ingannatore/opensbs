import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ColorPalette from '../../colorPalette';

interface EmptyBodyProps {
    x: number,
    y: number,
}

export default class EmptyBody extends React.Component<EmptyBodyProps, {}> {
    private readonly translation: string;

    constructor(props: EmptyBodyProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="210" y="85"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_DARK}
                >NO</text>
                <text
                    x="210" y="165"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_DARK}
                >TARGET</text>
                <text
                    x="210" y="245"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_DARK}
                >SELECTED</text>
            </g>
        );
    }
}
