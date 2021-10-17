import * as React from 'react';
import EntityTrace from '../../../models/entityTrace';
import SvgTransforms from '../../../lib/svgTransforms';
import GaugeElement from '../../elements/gaugeElement';

interface HullDataProps {
    x: number,
    y: number,
    trace: EntityTrace,
}

export default class HullData extends React.Component<HullDataProps, {}> {
    private readonly translation: string;

    constructor(props: HullDataProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <GaugeElement
                    x={0} y={0}
                    ratio={this.props.trace.structure.hullRatio}
                    label="hull"
                    inverse={true}
                >{Math.round(this.props.trace.structure.hullRatio * 100).toFixed(0)}</GaugeElement>
            </g>
        );
    }
}
