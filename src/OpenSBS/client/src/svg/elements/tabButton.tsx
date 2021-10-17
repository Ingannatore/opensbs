import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface TabButtonProps {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    toggled: boolean,
    onClick: () => void,
}

export default class TabButton extends React.Component<TabButtonProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        color: ColorPalette.MAIN,
        toggled: false,
    };

    constructor(props: TabButtonProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor="pointer" onClick={this.clickHandler}>
                <g transform="translate(10 0)">
                    <rect
                        x="0" y="0"
                        width={this.props.width}
                        height={this.props.height}
                        stroke={ColorPalette.MUTE_LIGHT} strokeWidth="2"
                        fill={this.props.toggled ? ColorPalette.MUTE_LIGHT : ColorPalette.BACKGROUND}
                    />
                    <text
                        x={this.props.width / 2} y={this.props.height / 2}
                        textAnchor="middle" fontSize="1.5rem"
                        fill={this.props.toggled ? ColorPalette.BACKGROUND : ColorPalette.MUTE_LIGHT}
                        fontWeight={this.props.toggled ? 'bold' : 'normal'}
                    >{this.props.children}</text>
                </g>
            </g>
        );
    }

    private clickHandler() {
        if (this.props.toggled) {
            return;
        }

        this.props.onClick();
    }
}
