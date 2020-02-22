import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface DisplayProps {
    x: number,
    y: number,
    title: string,
    subtitle: string,
    border: string,
    text: string,
}

export default class Display extends React.Component<DisplayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        border: '#383838',
        text: '#dedede',
    };

    constructor(props: DisplayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <circle cx="0" cy="0" r="80" stroke={this.props.border} fill="#020202" strokeWidth="2"/>
                {this.props.title && (
                    <text x="0" y="-45" textAnchor="middle" fontSize="1rem" fill="#999999">{this.props.title}</text>
                )}
                <text x="0" y="0" textAnchor="middle" fontSize="4rem" fill={this.props.text}>{this.props.children}</text>
                {this.props.subtitle && (
                    <text x="0" y="40" textAnchor="middle" fontSize="1rem" fill="#999999">{this.props.subtitle}</text>
                )}
            </g>
        );
    }
}
