import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';
import ColorPalette from '../color-palette';

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
                <text
                    x="0" y="-55"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.HEADER}
                >{this.props.topLabel}</text>
                <text
                    x="0" y="0"
                    fontSize="5rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.children}</text>
                <text
                    x="0" y="55"
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.TEXT}
                >{this.props.bottomLabel}</text>
            </g>
        );
    }
}
