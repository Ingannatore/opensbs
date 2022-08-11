import * as React from 'react';
import SvgTransforms from '../../../lib/svgTransforms';
import ColorPalette from '../../colorPalette';

interface DistancesOverlayProps {
    x: number,
    y: number,
    r: number,
    range: number,
    visible: boolean,
    numberOfMarkers: number,
}

export default class DistancesOverlay extends React.Component<DistancesOverlayProps, {}> {
    private readonly radiusIncrement: number;
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        r: 460,
        visible: true,
        numberOfMarkers: 5,
    };

    constructor(props: DistancesOverlayProps) {
        super(props);

        this.radiusIncrement = this.props.r / this.props.numberOfMarkers;
        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const rangeIncrement = this.props.range / this.props.numberOfMarkers;
        const markers = Array.from(
            {length: this.props.numberOfMarkers},
            (value, key) => this.renderMarker(key + 1, rangeIncrement)
        );

        return (
            <g transform={this.translation}>
                {markers}
            </g>
        );
    }

    private renderMarker(index: number, rangeIncrement: number) {
        const radius = this.radiusIncrement * index;
        const range = rangeIncrement * index;
        return (
            <g key={'distance-marker-' + radius}>
                <circle
                    cx="0" cy="0" r={radius}
                    stroke={ColorPalette.MUTE_LIGHT} strokeDasharray="2 4"
                    fill="none"
                />
                <text
                    x="0" y={16 - radius}
                    fontSize="1rem" textAnchor="middle"
                    fill={ColorPalette.MUTE_LIGHT}
                >{range}</text>
            </g>
        );
    }
}
