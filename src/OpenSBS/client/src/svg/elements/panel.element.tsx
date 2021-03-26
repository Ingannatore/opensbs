import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface PanelElementModel {
    x: number,
    y: number,
    width: number,
    height: number,
    mirror: boolean,
}

export default class PanelElement extends React.Component<PanelElementModel, {}> {
    private readonly translation: string;
    private readonly path: string;

    public static defaultProps = {
        mirror: false,
    };

    constructor(props: PanelElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.path = `M ${this.props.width + 1} ${this.props.height} L 10 ${this.props.height} L 0 ${this.props.height - 10} L 0 10 L 10 0 L ${this.props.width + 1} 0 Z`
    }

    public render() {
        return (
            <g transform={this.translation}>
                <path
                    d={this.path}
                    stroke="none" fill="black"
                    shapeRendering="crispEdges"
                    transform={this.props.mirror ? `translate(${this.props.width - 10} 0) scale(-1 1)` : ''}
                    opacity="1"
                />
                <path
                    d={this.path}
                    stroke="#383838" strokeWidth="2" fill="none"
                    shapeRendering="crispEdges"
                    transform={this.props.mirror ? `translate(${this.props.width - 10} 0) scale(-1 1)` : ''}
                />
                {this.props.children}
            </g>
        );
    }
}
