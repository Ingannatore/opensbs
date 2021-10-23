import * as React from 'react';
import Angles from '../../../lib/angles';
import SvgTransforms from '../../../lib/svgTransforms';
import TraceSpatialData from '../../../models/traceSpatialData';
import DataRow from '../../elements/dataRow';

interface SpatialDataProps {
    x: number,
    y: number,
    data: TraceSpatialData,
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
                <DataRow x={0} y={0} label="Position">
                    {SpatialData.getSideName(this.props.data.relativeSide)}
                </DataRow>
                <DataRow x={0} y={50} label="Distance">
                    {this.props.data.distance}
                </DataRow>
                <DataRow x={0} y={100} label="Direction">
                    {Angles.bearingToString(this.props.data.relativeBearing)}
                </DataRow>
                <DataRow x={0} y={150} label="Bearing">
                    {Angles.bearingToString(this.props.data.bearing)}
                </DataRow>
                <DataRow x={0} y={200} label="Speed">
                    {this.props.data.speed}
                </DataRow>
                <DataRow x={0} y={250} label="Size">
                    {this.props.data.size}
                </DataRow>
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
}
