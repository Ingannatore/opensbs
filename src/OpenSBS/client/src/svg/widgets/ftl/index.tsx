import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import PanelElement from 'svg/elements/panelElement';

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
            <PanelElement x={this.props.x} y={this.props.y} width={450} height={300} isOffline={true}/>
        );
    }
}
