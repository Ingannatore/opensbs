import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';
import DisplayElement from '../../elements/display.element';

interface EngineWidgetModel {
    x: number,
    y: number,
}

export default class EngineWidget extends React.Component<EngineWidgetModel, {}> {
    private readonly translation: string;

    constructor(props: EngineWidgetModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <DisplayElement x={0} y={0} topLabel="SUB-SPEED" bottomLabel="meters/sec">9999</DisplayElement>
            </g>
        );
    }
}
