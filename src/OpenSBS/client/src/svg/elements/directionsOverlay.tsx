import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface DirectionsOverlayProps {
    x: number,
    y: number,
    size: number,
    visible: boolean,
}

export default class DirectionsOverlay extends React.Component<DirectionsOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        size: 440,
        visible: true,
    };

    constructor(props: DirectionsOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const lines = Array
        .from(Array(4), (value, index) => index * 45)
        .map((angle: number) => DirectionsOverlay.renderLine(this.props.size, angle));

        return (
            <g transform={this.translation}>
                {lines}
            </g>
        );
    }

    private static renderLine(size: number, angle: number) {
        const transform = SvgTransforms.rotate(angle);
        return (
            <line
                key={'direction-' + angle}
                x1="0" y1={-size}
                x2="0" y2={size}
                stroke="#616161"
                transform={transform}
            />
        );
    }
}
