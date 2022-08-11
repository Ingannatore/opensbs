import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import TraceShieldData from 'models/traceShieldData';
import ColorPalette from 'svg/colorPalette';
import CylinderElement from 'svg/elements/cylinderElement';

interface ShieldDataProps {
    x: number,
    y: number,
    data: TraceShieldData | null,
}

export default class ShieldData extends React.Component<ShieldDataProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldDataProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.data) {
            return this.renderNoShieldContent();
        }

        return (
            <g transform={this.translation}>
                <g transform="translate(0 0)">
                    <text
                        x="10" y="25"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Shield Status</text>
                    <text
                        x="210" y="25"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{this.props.data.isRaised ? 'ON' : 'OFF'}</text>
                </g>

                <CylinderElement
                    x={35} y={75}
                    height={226}
                    ratio={this.props.data.frontRatio}
                />
                <CylinderElement
                    x={85} y={75}
                    height={226}
                    ratio={this.props.data.leftRatio}
                />
                <CylinderElement
                    x={135} y={75}
                    height={226}
                    ratio={this.props.data.rightRatio}
                />
                <CylinderElement
                    x={185} y={75}
                    height={226}
                    ratio={this.props.data.rearRatio}
                />

                <text
                    x="35" y="325"
                    fontSize=".75rem" textAnchor="middle"
                    fill={ColorPalette.MUTE_LIGHT}
                >FRONT</text>
                <text
                    x="85" y="325"
                    fontSize=".75rem" textAnchor="middle"
                    fill={ColorPalette.MUTE_LIGHT}
                >LEFT</text>
                <text
                    x="135" y="325"
                    fontSize=".75rem" textAnchor="middle"
                    fill={ColorPalette.MUTE_LIGHT}
                >RIGHT</text>
                <text
                    x="185" y="325"
                    fontSize=".75rem" textAnchor="middle"
                    fill={ColorPalette.MUTE_LIGHT}
                >REAR</text>
            </g>
        );
    }

    private renderNoShieldContent() {
        return (
            <g transform={this.translation}>
                <text
                    x="110" y="75"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >NO</text>
                <text
                    x="110" y="175"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >SHIELD</text>
                <text
                    x="110" y="275"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >DETECTED</text>
            </g>
        );
    }
}
