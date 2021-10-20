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
                {this.renderRow(0, 'Position', SpatialData.getSideName(this.props.trace.spatial.relativeSide))}
                {this.renderRow(50, 'Distance', this.props.trace.spatial.distance)}
                {this.renderRow(100, 'Direction', Angles.bearingToString(this.props.trace.spatial.relativeBearing))}
                {this.renderRow(150, 'Bearing', Angles.bearingToString(this.props.trace.spatial.bearing))}
                {this.renderRow(200, 'Speed', this.props.trace.spatial.speed)}
                {this.renderRow(250, 'Size', this.props.trace.spatial.size)}
                {this.renderRow(300, 'Reputation', SpatialData.getReputationName(this.props.trace.reputation))}
            </g>
        );
    }

    private renderRow(y: number, label: string, value: any) {
        const transform = SvgTransforms.translate(0, y);
        return (
            <g transform={transform}>
                <text
                    x="0" y="25"
                    fontSize="1rem" textAnchor="start"
                    fill={ColorPalette.MUTE_LIGHT}
                >{label}</text>
                <text
                    x="200" y="25"
                    fontSize="1.5rem" textAnchor="end"
                    fill={ColorPalette.TEXT}
                >{value}</text>
            </g>
        );
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
