import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface PillDisplayProps {
    x: number,
    y: number,
    primaryValue: string,
    primaryTitle: string,
    secondaryValue: string,
    secondaryTitle: string,
}

export default class PillDisplay extends React.Component<PillDisplayProps, {}> {
    private readonly translation: string;

    constructor(props: PillDisplayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        return (
            <g transform={this.translation}>
                <line x1="0" y1="0" x2="250" y2="0" stroke="#383838" strokeWidth="62" strokeLinecap="round"/>
                <line x1="0" y1="0" x2="250" y2="0" stroke="#020202" strokeWidth="58" strokeLinecap="round"/>
                <line x1="150" y1="-24" x2="150" y2="24" stroke="#383838"/>
                <g transform="translate(60 0)">
                    <text x="0" y="-5" textAnchor="middle" fontSize="2rem" fill="#dedede">
                        {this.props.primaryValue}
                    </text>
                    <text x="0" y="17" textAnchor="middle" fontSize=".75rem" fill="#999999">
                        {this.props.primaryTitle}
                    </text>
                </g>
                <g transform="translate(215 0)">
                    <text x="0" y="-5" textAnchor="middle" fontSize="2rem" fill="#dedede">
                        {this.props.secondaryValue}
                    </text>
                    <text x="0" y="17" textAnchor="middle" fontSize=".75rem" fill="#999999">
                        {this.props.secondaryTitle}
                    </text>
                </g>
            </g>
        );
    }
}
