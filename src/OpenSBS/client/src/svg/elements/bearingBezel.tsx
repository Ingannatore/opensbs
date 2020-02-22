import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface BearingBezelProps {
    x: number,
    y: number,
    rotation: number,
}

export default class BearingBezel extends React.Component<BearingBezelProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        rotation: 0,
    };

    constructor(props: BearingBezelProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render(): JSX.Element {
        const rotation = SvgTransforms.rotate(-this.props.rotation);
        const markers = Array
        .from(Array(120), (value, index) => index * 3)
        .map((angle: number) => BearingBezel.renderMarker(angle));

        return (
            <g transform={this.translation}>
                <circle cx="0" cy="0" r="500" stroke="#383838" fill="#020202" strokeWidth="2"/>
                <g transform={rotation}>
                    {markers}
                </g>
                <circle cx="0" cy="0" r="440" stroke="#616161" fill="none" strokeWidth="1"/>
            </g>
        );
    }

    private static renderMarker(angle: number) {
        const rotation = SvgTransforms.rotate(angle);
        const isMajor = angle % 15 === 0;

        if (isMajor) {
            return (
                <g key={'marker-' + angle} transform={rotation}>
                    <text x="0" y="-482" textAnchor="middle" fontSize="1rem" fill="#dedede">{angle}</text>
                    <line x1="0" y1="-450" x2="0" y2="-468" stroke="#999999" strokeWidth="2"/>
                </g>
            );
        }

        return (
            <g key={'marker-' + angle} transform={rotation}>
                <line x1="0" y1="-450" x2="0" y2="-460" stroke="#999999"/>
            </g>
        );
    }
}
