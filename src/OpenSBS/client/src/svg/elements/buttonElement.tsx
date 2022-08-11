import * as React from 'react';
import SvgTransforms from '../../lib/svgTransforms';
import ColorPalette from '../colorPalette';
import BaseComponentProps from "../../models/baseComponentProps";

interface ButtonElementProps extends BaseComponentProps {
    x: number,
    y: number,
    width: number,
    height: number,
    fontSize: number,
    color: string,
    enabled: boolean,
    onClick: () => void,
}

interface ButtonElementState {
    pressed: boolean,
}

export default class ButtonElement extends React.Component<ButtonElementProps, ButtonElementState> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        fontSize: 1.5,
        color: ColorPalette.MAIN,
        enabled: true,
    };

    constructor(props: ButtonElementProps) {
        super(props);
        this.state = {
            pressed: false,
        }

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    public render() {
        return (
            <g
                transform={this.translation}
                cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
                onMouseDown={this.mouseDownHandler}
                onMouseUp={this.mouseUpHandler}
            >
                <rect
                    x="0" y="0" rx="6"
                    width={this.props.width} height={this.props.height} strokeWidth="2"
                    fill="none"
                    stroke={this.props.enabled ? this.props.color : 'grey'}
                    opacity={this.props.enabled ? 1 : 0.2}
                />
                <rect
                    x="0" y="0" rx="6"
                    width={this.props.width} height={this.props.height} strokeWidth="2"
                    fill={this.state.pressed ? 'none' : this.props.enabled ? this.props.color : 'darkgrey'}
                    opacity={0.05}
                    stroke="none"
                />
                <rect
                    x="4" y="4" rx="4"
                    width={this.props.width - 8} height={this.props.height - 8}
                    fill={!this.state.pressed ? 'none' : this.props.enabled ? this.props.color : 'darkgrey'}
                    stroke="none"
                />
                <text
                    x={this.props.width / 2} y={this.props.height / 2}
                    textAnchor="middle" fontSize={this.props.fontSize + 'rem'}
                    fill={this.state.pressed ? 'black' : this.props.enabled ? this.props.color : 'grey'}
                    opacity={this.props.enabled ? 1 : 0.2}
                >{this.props.children}</text>
            </g>
        );
    }

    private mouseDownHandler() {
        if (this.props.enabled) {
            this.setState({
                ...this.state,
                pressed: true
            });

            this.props.onClick();
        }
    }

    private mouseUpHandler() {
        this.setState({
            ...this.state,
            pressed: false
        });
    }
}
