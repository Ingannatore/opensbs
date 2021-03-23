import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import DisplayElement from '../../elements/display.element';

interface FtlWidgetModel {
    x: number,
    y: number,
}

export default class FtlWidget extends React.Component<FtlWidgetModel, {}> {
    private readonly translation: string;

    constructor(props: FtlWidgetModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <DisplayElement x={0} y={0} topLabel="FTL FACTOR" bottomLabel="au/sec">9999</DisplayElement>
            </g>
        );
    }
}
