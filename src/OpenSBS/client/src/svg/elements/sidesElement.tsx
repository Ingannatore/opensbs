import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface SidesElementProps {
    x: number,
    y: number,
    r: number,
    rotation: number,
}

export default class SidesElement extends React.Component<SidesElementProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        rotation: 0,
    };

    constructor(props: SidesElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <g transform={SvgTransforms.rotate(this.props.rotation)}>
                    <line
                        x1={-this.props.r} y1="0" x2={this.props.r} y2="0"
                        stroke={ColorPalette.MUTE} strokeWidth="1"
                        transform="rotate(45)"
                    />
                    <line
                        x1={-this.props.r} y1="0" x2={this.props.r} y2="0"
                        stroke={ColorPalette.MUTE} strokeWidth="1"
                        transform="rotate(-45)"
                    />
                </g>
            </g>
        );
    }
}
