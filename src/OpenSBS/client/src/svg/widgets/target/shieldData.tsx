import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import CylinderElement from '../../elements/cylinderElement';
import ColorPalette from '../../colorPalette';

interface ShieldDataProps {
    x: number,
    y: number,
    trace: EntityTrace,
}

export default class ShieldData extends React.Component<ShieldDataProps, {}> {
    private readonly translation: string;

    constructor(props: ShieldDataProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.trace.shield) {
            return this.renderNoShieldContent();
        }

        return (
            <g transform={this.translation}>
                <g transform="translate(0 0)">
                    <text
                        x="-10" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Shield Status</text>
                    <text
                        x="190" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{this.props.trace.shield.isRaised ? 'ON' : 'OFF'}</text>
                </g>

                <CylinderElement
                    x={10} y={50}
                    height={186}
                    ratio={this.props.trace.shield.frontRatio}
                />
                <CylinderElement
                    x={60} y={50}
                    height={186}
                    ratio={this.props.trace.shield.leftRatio}
                />
                <CylinderElement
                    x={110} y={50}
                    height={186}
                    ratio={this.props.trace.shield.rightRatio}
                />
                <CylinderElement
                    x={160} y={50}
                    height={186}
                    ratio={this.props.trace.shield.rearRatio}
                />

                <text
                    x="30" y="260"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >FRONT</text>
                <text
                    x="80" y="260"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >LEFT</text>
                <text
                    x="130" y="260"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >RIGHT</text>
                <text
                    x="180" y="260"
                    fontSize=".75rem" textAnchor="end"
                    fill={ColorPalette.MUTE_LIGHT}
                >REAR</text>
            </g>
        );
    }

    private renderNoShieldContent() {
        return (
            <g transform={this.translation}>
                <text
                    x="90" y="60"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >NO</text>
                <text
                    x="90" y="140"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >SHIELD</text>
                <text
                    x="90" y="220"
                    textAnchor="middle" fontSize="2.5rem"
                    fontWeight="light"
                    fill={ColorPalette.MUTE_LIGHT}
                >DETECTED</text>
            </g>
        );
    }
}
