import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ValueElement from '../../elements/value.element';
import ColorPalette from '../../colorPalette';

interface ArcsElementProps {
    x: number,
    y: number,
}

export default class ArcsElements extends React.Component<ArcsElementProps, {}> {
    private readonly translation: string;
    private readonly pathLength: number;

    constructor(props: ArcsElementProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.pathLength = 2 * Math.PI * 42;
    }

    public render() {
        const baseDash = this.pathLength / 4;

        return (
            <g transform={this.translation}>
                <circle
                    cx="0" cy="0" r="42" fill="none"
                    stroke={ColorPalette.MUTE_DARK} strokeWidth="10"
                    strokeDasharray={`${(baseDash) - 2} 2`}
                    strokeDashoffset={baseDash / 2}
                />
                <circle
                    cx="0" cy="0" r="34"
                    stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                    fill="none"
                />
                <ValueElement x={0} y={15}>ARCS</ValueElement>
            </g>
        );
    }
}
