import * as React from 'react';
import SvgTransforms from '../../../lib/svg-transforms';

interface HelmStatusElementModel {
    x: number,
    y: number,
    rudder: number,
}

export default class HelmStatusElement extends React.Component<HelmStatusElementModel, {}> {
    private readonly translation: string;

    constructor(props: HelmStatusElementModel) {
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
                >{this.getStatus()}</text>
                <text
                    x="210" y="44"
                    textAnchor="middle" fontSize="1rem"
                    fill="grey"
                >helm status</text>
            </g>
        );
    }

    private getStatus(): string {
        if (this.props.rudder < 0) {
            return 'Turning to Port';
        }
        if (this.props.rudder > 0) {
            return 'Turning to Starboard';
        }

        return 'Idle';
    }
}
