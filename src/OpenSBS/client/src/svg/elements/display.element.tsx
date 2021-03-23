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
                <circle cx="0" cy="0" r="110" stroke="#383838" strokeWidth="2" fill="black"/>
                <line x1="-80" y1="-40" x2="80" y2="-40" stroke="#121212" strokeWidth="1"/>
                <line x1="-80" y1="40" x2="80" y2="40" stroke="#121212" strokeWidth="1"/>

                <text x="0" y="-60" textAnchor="middle" fontSize="1rem" fill="grey">{this.props.topLabel}</text>
                <text x="0" y="0" textAnchor="middle" fontSize="5rem" fill="whitesmoke">{this.props.children}</text>
                <text x="0" y="60" textAnchor="middle" fontSize="1rem" fill="grey">{this.props.bottomLabel}</text>
            </g>
        );
    }
}
