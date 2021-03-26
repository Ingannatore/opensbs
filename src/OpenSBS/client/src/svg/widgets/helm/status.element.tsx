import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';

interface StatusElementModel {
    x: number,
    y: number,
    label: string,
}

export default class StatusElement extends React.Component<StatusElementModel, {}> {
    private readonly translation: string;

    constructor(props: StatusElementModel) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <text
                    x="210" y="12"
                    textAnchor="middle" fontSize="1.75rem"
                    fill="whitesmoke"
                >{this.props.children}</text>
                <text
                    x="210" y="44"
                    textAnchor="middle" fontSize="1rem"
                    fill="grey"
                >{this.props.label}</text>
            </g>
        );
    }
}
