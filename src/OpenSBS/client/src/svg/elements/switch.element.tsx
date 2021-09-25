import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';

interface SwitchElementModel {
    x: number,
    y: number,
    rx: number,
    width: number,
    height: number,
    fontSize: number,
    color: string,
    toggled: boolean,
    enabled: boolean,
    onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void,
}

export default class SwitchElement extends React.Component<SwitchElementModel, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        rx: 6,
        fontSize: 1.5,
        color: 'darkturquoise',
        toggled: false,
        enabled: true,
    };

    constructor(props: SwitchElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public render() {
        return (
            <g transform={this.translation} cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
               onClick={this.clickHandler}>
                <rect
                    x="0" y="0" rx={this.props.rx}
                    width={this.props.width} height={this.props.height} strokeWidth="2"
                    fill={ColorPalette.BACKGROUND}
                    stroke="none"
                />
                <rect
                    x="0" y="0" rx={this.props.rx}
                    width={this.props.width} height={this.props.height} strokeWidth="2"
                    fill="none"
                    stroke={this.props.enabled ? this.props.color : 'grey'}
                    opacity={this.props.enabled ? 1 : 0.2}
                />
                <rect
                    x="0" y="0" rx={this.props.rx}
                    width={this.props.width} height={this.props.height} strokeWidth="2"
                    fill={this.props.toggled ? 'none' : this.props.enabled ? this.props.color : 'darkgrey'}
                    opacity={0.05}
                    stroke="none"
                />
                <rect
                    x="4" y="4" rx={this.props.rx - 2}
                    width={this.props.width - 8} height={this.props.height - 8}
                    fill={!this.props.toggled ? 'none' : this.props.enabled ? this.props.color : 'darkgrey'}
                    stroke="none"
                />
                <text
                    x={this.props.width / 2} y={this.props.height / 2}
                    textAnchor="middle" fontSize={this.props.fontSize + 'rem'}
                    fill={this.props.toggled ? 'black' : this.props.enabled ? this.props.color : 'grey'}
                    opacity={this.props.enabled ? 1 : 0.2}
                >{this.props.children}</text>
            </g>
        );
    }

    private clickHandler(event: React.MouseEvent<SVGElement, MouseEvent>) {
        if (this.props.enabled) {
            this.props.onClick(event);
        }
    }
}
