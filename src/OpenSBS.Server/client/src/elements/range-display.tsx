import * as React from 'react';
import Display from './display';

interface RangeDisplayComponentProps {
    x: number,
    y: number,
    size: number,
    title: string,
    children: number
}

export default class RangeDisplay extends React.Component<RangeDisplayComponentProps, {}> {
    public static defaultProps = {
        size: 80
    };

    constructor(props: RangeDisplayComponentProps) {
        super(props);
    }

    public render() {
        const unitOfMeasure = this.props.children <= 1000 ? 'meters' : 'kilometers';
        const displayValue = this.props.children <= 1000 ? this.props.children : this.props.children / 1000;
        return (
            <Display
                x={this.props.x} y={this.props.y} size={this.props.size}
                title={this.props.title} subtitle={unitOfMeasure}
            >{displayValue}</Display>
        );
    }
}
