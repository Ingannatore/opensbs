import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import ColorPalette from '../color-palette';
import ValueElement from './value.element';

interface GaugeProps {
    x: number,
    y: number,
    fill: string,
    value: string,
    ratio: number,
    label: string | undefined,
}

export default class GaugeElement extends React.Component<GaugeProps, {}> {
    private readonly translation: string;
    private readonly pathLength: number;

    public static defaultProps = {
        fill: ColorPalette.FILLER,
        label: undefined,
    };

    constructor(props: GaugeProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.pathLength = 2 * Math.PI * 42;
    }

    public render() {
        const filled = this.pathLength * this.props.ratio;
        const unfilled = this.pathLength - filled;

        return (
            <g transform={this.translation}>
                <circle
                    cx="0" cy="0" r="42" fill="none"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="10"
                    strokeDasharray={`${(this.pathLength / 20) - 2} 2`}
                />
                <circle
                    cx="0" cy="0" r="42" fill="none"
                    stroke={this.props.fill} strokeWidth="10"
                    transform="rotate(-90)"
                    strokeDasharray={`${filled} ${unfilled}`}
                />
                <circle
                    cx="0" cy="0" r="34"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    fill="none"
                />
                <ValueElement
                    x={0} y={5}
                    label="sec"
                >{this.props.value}</ValueElement>
            </g>
        );
    }
}
