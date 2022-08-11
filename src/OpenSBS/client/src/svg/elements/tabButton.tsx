import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import BaseComponentProps from 'models/baseComponentProps';
import ColorPalette from 'svg/colorPalette';

interface TabButtonProps extends BaseComponentProps {
    x: number,
    y: number,
    width: number,
    height: number,
    toggled: boolean,
    enabled: boolean,
    onClick: () => void,
}

export default class TabButton extends React.Component<TabButtonProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        toggled: false,
        enabled: true,
    };

    constructor(props: TabButtonProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        const height = this.props.height + (this.props.toggled && this.props.enabled ? 1 : -5)
        const path = `M 0 ${height} L 0 0 L ${this.props.width} 0 L ${this.props.width} ${height}`;
        return (
            <g
                transform={this.translation}
                cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
                onClick={this.clickHandler}
            >
                <g transform="translate(10 0)">
                    <rect
                        x="0" y="0"
                        width={this.props.width}
                        height={this.props.height + (this.props.toggled && this.props.enabled ? 5 : -5)}
                        stroke="none"
                        fill={ColorPalette.BACKGROUND}
                    />
                    <path
                        d={path}
                        stroke={ColorPalette.MUTE} strokeWidth="2"
                        fill="none"
                    />
                    <text
                        x={this.props.width / 2} y={this.props.height / 2}
                        textAnchor="middle" fontSize="1.5rem"
                        fill={this.getTextFill()}
                    >{this.props.children}</text>
                </g>
            </g>
        );
    }

    private clickHandler() {
        if (this.props.toggled || !this.props.enabled) {
            return;
        }

        this.props.onClick();
    }

    private getTextFill(): string {
        if (!this.props.enabled) {
            return ColorPalette.MUTE_DARK
        }

        return this.props.toggled ? ColorPalette.TEXT : ColorPalette.MUTE_LIGHT;
    }
}
