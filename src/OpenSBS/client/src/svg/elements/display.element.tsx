import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface DisplayElementModel {
    x: number,
    y: number,
    topLabel: string,
    bottomLabel: string,
}

export default class DisplayElement extends React.Component<DisplayElementModel, {}> {
    private readonly translation: string;

    constructor(props: DisplayElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text x="0" y="-55" textAnchor="middle" fontSize="1rem" fill="grey">{this.props.topLabel}</text>
                <text x="0" y="0" textAnchor="middle" fontSize="5rem" fill="whitesmoke">{this.props.children}</text>
                <text x="0" y="55" textAnchor="middle" fontSize="1rem" fill="grey">{this.props.bottomLabel}</text>
            </g>
        );
    }
}
