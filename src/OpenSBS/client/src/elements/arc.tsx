import * as React from 'react';
import Angle from '../lib/angle';
import Coords from '../lib/coords';

interface ArcComponentProps {
    x: number,
    y: number,
    size: number,
    stroke: string,
    strokeWidth: number,
    fromAngle: number,
    toAngle: number,
}

export default class Arc extends React.Component<ArcComponentProps, {}> {
    private readonly start: any;
    private readonly end: any;
    private readonly isLargeArc: boolean;

    public static defaultProps = {
        x: 0,
        y: 0,
        stroke: '#c0daf1',
        strokeWidth: 2
    };

    constructor(props: ArcComponentProps) {
        super(props);

        this.start = Coords.toCarthesian(this.props.size, Angle.toRadians(this.props.fromAngle));
        this.end = Coords.toCarthesian(this.props.size, Angle.toRadians(this.props.toAngle));
        this.isLargeArc = this.props.toAngle - this.props.fromAngle > 180;
    }

    public render() {
        const d = `M${this.start.x} ${this.start.y} A${this.props.size} ${this.props.size} 0 ${this.isLargeArc ? 1 : 0} 1 ${this.end.x} ${this.end.y}`;
        return (
            <path fill="none"
                  stroke={this.props.stroke}
                  strokeWidth={this.props.strokeWidth}
                  strokeLinecap="square"
                  d={d}
            />
        );
    }
}
