import * as React from 'react';

interface RangesComponentProps {
    x: number,
    y: number,
    size: number,
    distance: number,
    intervals: number,
    showTextes: boolean
}

export default class Ranges extends React.Component<RangesComponentProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        intervals: 5,
        showTextes: true
    };

    constructor(props: RangesComponentProps) {
        super(props);
        this.translation = this.props.x || this.props.y ? `translate(${this.props.x} ${this.props.y})` : '';
    }

    public render() {
        const deltaRadius = this.props.size / this.props.intervals;
        const deltaValue = this.props.distance / this.props.intervals;

        const circles = Array
            .from({length: this.props.intervals}, (value, key) => key)
            .filter(Boolean)
            .map((index: number) => index * deltaRadius)
            .map((radius: number) => Ranges.renderCircle(radius));

        const texts = Array
            .from({length: this.props.intervals + 1}, (value, key) => key)
            .filter(Boolean)
            .map((index: number) => {
                return {radius: index * deltaRadius, value: index * deltaValue}
            }).map((text: any) => Ranges.renderText(text.radius, text.value));

        return (
            <g transform={this.translation}>
                {circles}
                {this.props.showTextes && texts}
            </g>
        );
    }

    private static renderCircle(radius: number) {
        return (
            <circle
                key={'rangecircle-' + radius}
                cx="0" cy="0" r={radius}
                stroke="#122127" strokeWidth="1"
                fill="none"
            />
        );
    }

    private static renderText(radius: number, value: number) {
        const stringValue = value < 1000 ? value : value / 1000 + 'k';
        return (
            <text
                key={'rangetext-' + value}
                x={radius - 4} y="-8"
                fontSize=".75rem" fill="#76797c" textAnchor="end"
            >{stringValue}</text>
        );
    }
}
