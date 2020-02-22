import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import DoubleDisplay from '../elements/doubleDisplay';
import RoundButton from '../elements/roundButton';
import ArcSlider from '../elements/arcSlider';

interface ImpulseEngineProps {
    x: number,
    y: number,
}

export default class ImpulseEngine extends React.Component<ImpulseEngineProps> {
    private readonly translation: string;

    constructor(props: ImpulseEngineProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.decreaseEngineHandler = this.decreaseEngineHandler.bind(this);
        this.increaseEngineHandler = this.increaseEngineHandler.bind(this);
    }

    render() {
        return (
            <g transform={this.translation}>
                <ArcSlider
                    size={3} minValue={-100} maxValue={100} value={-60}
                    labels={'100  80  60  40  20  off -20 -40 -60 -80 -100'}
                />
                <DoubleDisplay
                    topTitle={'meters/sec'} topValue={'0'}
                    bottomTitle={'power'} bottomValue={'-'}
                />
                <RoundButton
                    x={80} y={140}
                    onClick={this.decreaseEngineHandler}
                >-5%</RoundButton>
                <RoundButton
                    x={140} y={80}
                    onClick={this.increaseEngineHandler}
                >+5%</RoundButton>
            </g>
        );
    }

    private decreaseEngineHandler() {
        return;
    }

    private increaseEngineHandler() {
        return;
    }
}
