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
                <path
                    d="M -148 -30 L 148 -30 A 210 210 0 0 1 190 30 L -190 30 A 210 210 0 0 1 -148 -30"
                    fill="black" stroke="#383838" strokeWidth="2" strokeLinejoin="round"
                    transform="scale(1 -1)"
                />
                <text
                    x="0" y="-10"
                    textAnchor="middle" fontSize="1.75rem"
                    fill="whitesmoke"
                >{this.props.children}</text>
                <line x1="-140" y1="6" x2="140" y2="6" stroke="#121212" strokeWidth="1"/>
                <text
                    x="0" y="18"
                    textAnchor="middle" fontSize="1rem"
                    fill="grey"
                >{this.props.label}</text>
            </g>
        );
    }
}
