import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import ColorPalette from '../color-palette';

interface GaugeProps {
    x: number,
    y: number,
    ratio: number,
}

export default class GaugeElement extends React.Component<GaugeProps, {}> {
    private readonly translation: string;
    private readonly path: string;
    private readonly pathLength: number;

    constructor(props: GaugeProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.path = 'M -50 0 A 50 50 0 1 1 0 50';
        this.pathLength = 314 * (3 / 4);
    }

    public render() {
        const filled = this.pathLength * this.props.ratio;
        const unfilled = this.pathLength - filled;

        return (
            <g transform={this.translation}>
                <g transform="rotate(-45)">
                    <path
                        d={this.path}
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="20" strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d={this.path}
                        stroke={ColorPalette.BACKGROUND} strokeWidth="16" strokeLinecap="round"
                        fill="none"
                    />
                    {this.props.ratio > 0 && <path
                        d={this.path}
                        stroke={ColorPalette.FILLER} strokeWidth="12" strokeLinecap="round"
                        strokeDasharray={filled + ' ' + unfilled}
                        fill="none"
                    />}
                </g>
            </g>
        );
    }
}
