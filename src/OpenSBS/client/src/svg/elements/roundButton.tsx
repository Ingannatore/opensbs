import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface ButtonProps {
    x: number,
    y: number,
    toggled: boolean,
    enabled: boolean,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void,
}

export default class RoundButton extends React.Component<ButtonProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        toggled: false,
        enabled: true,
    };

    constructor(props: ButtonProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor="pointer" onClick={this.clickHandler}>
                <circle
                    cx="0" cy="0" r="30"
                    stroke="#383838" fill="#020202" strokeWidth="2"
                />
                <circle
                    cx="0" cy="0" r="26"
                    stroke={this.getContainerStroke()} fill={this.getContainerFill()} strokeWidth="1"
                />
                <text x="0" y="0" textAnchor="middle" fontSize="1.25rem" fill={this.getTextFill()}>
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
