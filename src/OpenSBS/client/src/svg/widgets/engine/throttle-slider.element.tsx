import * as React from 'react';
import ThrottleSliderPropsModel from './throttle-slider-props.model';
import SvgTransforms from '../../../lib/svg-transforms';

export default class ThrottleSliderElement extends React.Component<ThrottleSliderPropsModel, {}> {
    public static defaultProps = {
        color: 'darkturquoise',
    };

    public render() {
        return (
            <g transform={SvgTransforms.translate(this.props.x, this.props.y)}>
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="none" fill="black"
                />
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke="none" fill={this.props.color}
                    opacity={0.05}
                />
                <rect
                    x="40" y="-30"
                    width="120" height="60" rx="5"
                    stroke={this.props.color} strokeWidth="2"
                    fill="none"
                />
                <text
                    x="100" y="-8"
                    textAnchor="middle" fontSize="2rem"
                    fill="whitesmoke"
                >{this.props.children}</text>
                <text
                    x="100" y="16"
                    textAnchor="middle" fontSize="0.75rem"
                    fill="whitesmoke"
                >target speed</text>
            </g>
        );
    }
}
