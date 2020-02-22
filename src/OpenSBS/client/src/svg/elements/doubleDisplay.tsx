import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface DoubleDisplayProps {
    x: number,
    y: number,
    topTitle: string,
    topValue: string,
    bottomTitle: string,
    bottomValue: string,
}

export default class DoubleDisplay extends React.Component<DoubleDisplayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0
    };

    constructor(props: DoubleDisplayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <circle cx="0" cy="0" r="110" stroke="#383838" fill="#020202" strokeWidth="2"/>
                <text x="0" y="-80" textAnchor="middle" fontSize="1rem" fill="#999999">{this.props.topTitle}</text>
                <text x="0" y="-35" textAnchor="middle" fontSize="4rem" fill="#dedede">{this.props.topValue}</text>
                <line x1="-100" y1="0" x2="100" y2="0" stroke="#383838" strokeWidth="1"/>
                <text x="0" y="35" textAnchor="middle" fontSize="4rem" fill="#dedede">{this.props.bottomValue}</text>
                <text x="0" y="80" textAnchor="middle" fontSize="1rem" fill="#999999">{this.props.bottomTitle}</text>
            </g>
        );
    }
}
