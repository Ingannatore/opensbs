import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import CounterModel from '../../../models/counter.model';

interface CounterPropsModel {
    x: number,
    y: number,
    counter: CounterModel,
}

export default class CounterElement extends React.Component<CounterPropsModel, {}> {
    private readonly translation: string;

    constructor(props: CounterPropsModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        const endingX = Math.round(220 * this.props.counter.ratio);
        return (
            <g transform={this.translation}>
                <line x1="0" y1="0" x2="220" y2="0" stroke="#121212" strokeWidth="10" strokeLinecap="round"/>
                {endingX > 0 && <line
                    x1="0" y1="0"
                    x2={endingX} y2="0"
                    stroke="grey" strokeWidth="8"
                    strokeLinecap="round"
                />}
            </g>
        );
    }
}
