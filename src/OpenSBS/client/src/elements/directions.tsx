﻿import * as React from 'react';
import SvgTransforms from '../lib/svg-transforms';

interface DirectionsComponentProps {
    x: number,
    y: number,
    size: number,
    angles: string
}

export default class Directions extends React.Component<DirectionsComponentProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        angles: '0 45 90 135'
    };

    constructor(props: DirectionsComponentProps) {
        super(props);
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const lines = this.props.angles
            .split(' ')
            .map((value: string) => parseInt(value))
            .map((angle: number) => Directions.renderLine(this.props.size, angle));

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
                stroke="#2a363c" strokeDasharray="2 4"
                transform={transform}
            />
        );
    }
}