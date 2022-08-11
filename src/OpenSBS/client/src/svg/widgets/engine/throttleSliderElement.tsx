import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import BaseComponentProps from 'models/baseComponentProps';
import ColorPalette from 'svg/colorPalette';

interface ThrottleSliderElementProps extends BaseComponentProps {
    x: number,
    y: number,
}

export default class ThrottleSliderElement extends React.Component<ThrottleSliderElementProps, {}> {
    public render() {
        return (
            <g transform={SvgTransforms.translate(this.props.x, this.props.y)}>
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="none" fill={ColorPalette.BACKGROUND}
                />
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="none" fill={ColorPalette.MAIN}
                    opacity={0.05}
                />
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke={ColorPalette.MAIN} strokeWidth="2"
                    fill="none"
                />
                <text
                    x="100" y="-8"
                    textAnchor="middle" fontSize="2rem"
                    fill={ColorPalette.TEXT}
                >{this.props.children}%</text>
                <text
                    x="100" y="16"
                    textAnchor="middle" fontSize="0.75rem"
                    fill={ColorPalette.TEXT}
                >throttle</text>
            </g>
        );
    }
}
