import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import ColorPalette from 'svg/colorPalette';

interface ButtonComponentProps {
    id: string,
    x: number,
    y: number,
    rx: number,
    width: number,
    height: number,
    label: string,
    fontSize: number,
    color: string,
    enabled: boolean,
    toggled: boolean,
    onClick: (id: string) => void,
}

interface ButtonComponentState {
    pressed: boolean,
}

export default class ButtonComponent extends React.Component<ButtonComponentProps, ButtonComponentState> {
    private readonly translation: string;
    private readonly innerWidth: number;
    private readonly innerHeight: number;

    public static defaultProps = {
        x: 0,
        y: 0,
        rx: 6,
        fontSize: 1.5,
        color: ColorPalette.MAIN,
        enabled: true,
        toggled: false,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            pressed: false,
        }

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.innerWidth = this.props.width - 8;
        this.innerHeight = this.props.height - 8;
        this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }

    public render() {
        const opacity = this.props.enabled ? 1 : 0.2;

        return (
            <g
                transform={this.translation}
                cursor={this.props.enabled ? 'pointer' : 'not-allowed'}
            >
                <rect
                    x="0" y="0" rx={this.props.rx}
                    width={this.props.width} height={this.props.height} 
                    fill={ColorPalette.BACKGROUND}
                    stroke={this.getBorderColor()} strokeWidth="2"
                    opacity={opacity}
                />
                <rect
                    x="4" y="4" rx={this.props.rx - 2}
                    width={this.innerWidth} height={this.innerHeight}
                    fill={this.getFillColor()}
                    stroke="none"
                />
                <text
                    x={this.props.width / 2} y={this.props.height / 2}
                    textAnchor="middle" fontSize={this.props.fontSize + 'rem'}
                    fill={this.getLabelColor()}
                    opacity={opacity}
                >{this.props.label}</text>
                <rect
                    x="0" y="0" rx={this.props.rx}
                    width={this.props.width} height={this.props.height}
                    fill="black" stroke="none" opacity="0"
                    onMouseDown={this.onMouseDownHandler}
                    onMouseUp={this.onMouseUpHandler}
                />
            </g>
        );
    }

    private getBorderColor(): string {
        return this.props.enabled ? this.props.color : ColorPalette.MUTE_LIGHT;
    }

    private getFillColor(): string {
        if (!this.props.toggled && !this.state.pressed) {
            return 'none';
        }

        return this.props.enabled ? this.props.color : ColorPalette.MUTE;
    }

    private getLabelColor(): string {
        if (this.props.toggled || this.state.pressed) {
            return ColorPalette.BACKGROUND;
        }

        return this.props.enabled ? this.props.color : ColorPalette.MUTE_LIGHT;
    }

    private onMouseDownHandler() {
        if (this.props.enabled) {
            this.setState({...this.state, pressed: true});
            this.props.onClick(this.props.id);
        }
    }

    private onMouseUpHandler() {
        this.setState({...this.state, pressed: false});
    }
}
