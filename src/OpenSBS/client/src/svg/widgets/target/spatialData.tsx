import * as React from 'react';
import Angles from '../../../lib/angles';
import SvgTransforms from '../../../lib/svgTransforms';
import EntityTrace from '../../../models/entityTrace';
import ColorPalette from '../../colorPalette';

interface SpatialDataProps {
    x: number,
    y: number,
    trace: EntityTrace,
}

export default class SpatialData extends React.Component<SpatialDataProps, {}> {
    private readonly translation: string;

    constructor(props: SpatialDataProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <g transform="translate(0 0)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Position</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{SpatialData.getSideName(this.props.trace.spatial.relativeSide)}</text>
                </g>
                <g transform="translate(0 40)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Distance</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{this.props.trace.spatial.distance}</text>
                </g>
                <g transform="translate(0 80)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Bearing</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{Angles.bearingToString(this.props.trace.spatial.bearing)}</text>
                </g>
                <g transform="translate(0 120)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Direction</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{Angles.bearingToString(this.props.trace.spatial.relativeBearing)}</text>
                </g>
                <g transform="translate(0 160)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Speed</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{this.props.trace.spatial.speed}</text>
                </g>
                <g transform="translate(0 200)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Size</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={ColorPalette.TEXT}
                    >{this.props.trace.spatial.size}</text>
                </g>
                <g transform="translate(0 240)">
                    <text
                        x="0" y="20"
                        fontSize="1rem" textAnchor="start"
                        fill={ColorPalette.MUTE_LIGHT}
                    >Reputation</text>
                    <text
                        x="200" y="20"
                        fontSize="1.5rem" textAnchor="end"
                        fill={this.getColor()}
                    >{SpatialData.getReputationName(this.props.trace.reputation)}</text>
                </g>
            </g>
        );
    }

    private getColor() {
        if (this.props.trace.reputation < 0) {
            return ColorPalette.DANGER;
        }
        if (this.props.trace.reputation > 0) {
            return ColorPalette.SUCCESS;
        }

        return ColorPalette.TEXT
    }

    private static getSideName(side: string): string {
        switch (side) {
            case 'side.front':
                return 'Front';
            case 'side.left':
                return 'Left';
            case 'side.right':
                return 'Right';
            case 'side.rear':
                return 'Rear';
            default:
                return side;
        }
    }

    private static getReputationName(value: number): string {
        if (value > 0) {
            return 'FRIEND';
        }
        if (value < 0) {
            return 'ENEMY';
        }

        return 'NEUTRAL';
    }
}
