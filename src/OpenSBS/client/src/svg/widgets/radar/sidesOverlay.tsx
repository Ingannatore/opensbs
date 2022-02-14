import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ColorPalette from '../../colorPalette';

interface SidesOverlayProps {
    x: number,
    y: number,
    r: number,
    rotation: number,
}

export default class SidesOverlay extends React.Component<SidesOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        r: 460,
        rotation: 0,
    };

    constructor(props: SidesOverlayProps) {
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
