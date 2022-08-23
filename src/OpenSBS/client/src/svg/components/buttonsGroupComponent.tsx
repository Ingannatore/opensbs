import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import ColorPalette from 'svg/colorPalette';

interface ButtonGroupComponentProps {
    x: number,
    y: number,
    width: number,
    height: number,
    topLabel?: string,
    bottomLabel?: string,
    color: string,
    children: React.ReactNode,
}

export default class ButtonsGroupComponent extends React.Component<ButtonGroupComponentProps, {}> {
    private readonly translation: string;
    private readonly topLinePath: string;
    private readonly bottomLinePath: string;
    private readonly textY: number;

    public static defaultProps = {
        height: 40,
        color: ColorPalette.HEADER,
    };

    constructor(props: any) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.textY = 28 + (this.props.height / 2);

        const halfWidth = this.props.width / 2
        const lineY = 14 + (this.props.height / 2);
        this.topLinePath = `M -${halfWidth} ${-lineY + 8} L -${halfWidth} ${-lineY} L ${halfWidth} ${-lineY} L ${halfWidth} ${-lineY + 8}`
        this.bottomLinePath = `M -${halfWidth} ${lineY - 8} L -${halfWidth} ${lineY} L ${halfWidth} ${lineY} L ${halfWidth} ${lineY - 8}`
    }

    public render() {
        return (
            <g transform={this.translation}>
                {this.renderTopLabel()}
                {this.props.children}
                {this.renderBottomLabel()}
            </g>
        );
    }

    private renderTopLabel() {
        if (!this.props.topLabel) return null;

        return (
            <g>
                <text
                    x="0" y={-this.textY}
                    fontSize="1rem" textAnchor="middle"
                    fill={this.props.color}
                >{this.props.topLabel}</text>
                <path
                    d={this.topLinePath}
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                    fill="none"
                />
            </g>
        );
    }

    private renderBottomLabel() {
        if (!this.props.bottomLabel) return null;

        return (
            <g>
                <path
                    d={this.bottomLinePath}
                    stroke={ColorPalette.MUTE} strokeWidth="2"
                    fill="none"
                />
                <text
                    x="0" y={this.textY}
                    fontSize="1rem" textAnchor="middle"
                    fill={this.props.color}
                >{this.props.bottomLabel}</text>
            </g>
        );
    }
}
