import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface ButtonProps {
    x: number,
    y: number,
    width: number,
    height: number,
    fontSize: string,
    toggled: boolean,
    enabled: boolean,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void,
}

export default class PillButton extends React.Component<ButtonProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        width: 120,
        height: 60,
        fontSize: '1.25rem',
        toggled: false,
        enabled: true,
    };

    constructor(props: ButtonProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        const halfWidth = this.props.width / 2;
        return (
            <g transform={this.translation} cursor="pointer" onClick={this.clickHandler}>
                <line
                    x1={-halfWidth} y1="0"
                    x2={halfWidth} y2="0"
                    stroke="#383838" strokeWidth={this.props.height}
                    strokeLinecap="round"
                />
                <line
                    x1={-halfWidth} y1="0"
                    x2={halfWidth} y2="0"
                    stroke="#020202" strokeWidth={this.props.height - 4}
                    strokeLinecap="round"
                />
                <line
                    x1={-halfWidth} y1="0"
                    x2={halfWidth} y2="0"
                    stroke={this.getContainerStroke()} strokeWidth={this.props.height - 8}
                    strokeLinecap="round"
                />
                <line
                    x1={-halfWidth} y1="0"
                    x2={halfWidth} y2="0"
                    stroke={this.getContainerFill()} strokeWidth={this.props.height - 10}
                    strokeLinecap="round"
                />
                <text
                    x="0" y="0" fontSize={this.props.fontSize}
                    textAnchor="middle" fill={this.getTextFill()}
                >
                    {this.props.children}
                </text>
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGElement, MouseEvent>) {
        if (this.props.enabled) {
            this.props.onClick(event);
        }
    }

    private getContainerStroke() {
        return this.props.enabled ? '#36c7d0' : '#999999';
    }

    private getContainerFill() {
        return this.props.toggled ? '#36c7d0' : '#020202';
    }

    private getTextFill() {
        if (this.props.toggled) {
            return '#020202';
        }

        return this.props.enabled ? '#36c7d0' : '#999999';
    }
}
