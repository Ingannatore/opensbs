import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ValueElement from './valueElement';
import ColorPalette from '../colorPalette';

interface GaugeElementProps {
    x: number,
    y: number,
    fill: string,
    ratio: number,
    label: string | undefined,
    divisions: number,
    inverse: boolean,
}

export default class GaugeElement extends React.Component<GaugeElementProps, {}> {
    private readonly translation: string;
    private readonly pathLength: number;

    public static defaultProps = {
        fill: ColorPalette.FILLER,
        label: undefined,
        divisions: 20,
        inverse: false,
    };

    constructor(props: GaugeElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.pathLength = 2 * Math.PI * 42;
    }

    public render() {
        const baseDash = this.pathLength / this.props.divisions;
        const filled = this.pathLength * this.props.ratio;
        const unfilled = this.pathLength - filled;
        const fillerTransform = this.props.inverse ? 'scale(-1 1) rotate(-90)' : 'rotate(-90)';

        return (
            <g transform={this.translation}>
                <circle
                    cx="0" cy="0" r="42" fill="none"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="10"
                    strokeDasharray={`${(baseDash) - 2} 2`}
                />
                <circle
                    cx="0" cy="0" r="42" fill="none"
                    stroke={this.props.fill} strokeWidth="10"
                    transform={fillerTransform}
                    strokeDasharray={`${filled} ${unfilled}`}
                />
                <circle
                    cx="0" cy="0" r="34"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    fill="none"
                />
                <ValueElement
                    x={0} y={5}
                    label={this.props.label}
                >{this.props.children}</ValueElement>
            </g>
        );
    }
}
