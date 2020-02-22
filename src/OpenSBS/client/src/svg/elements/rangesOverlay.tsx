import * as React from 'react';
import SvgTransforms from '../../lib/svg-transforms';

interface RangesOverlayProps {
    x: number,
    y: number,
    size: number,
    range: number,
    visible: boolean,
}

export default class RangesOverlay extends React.Component<RangesOverlayProps, {}> {
    private readonly translation: string;

    public static defaultProps = {
        x: 0,
        y: 0,
        size: 440,
        range: 10000,
        visible: true
    };

    constructor(props: RangesOverlayProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
    }

    public render() {
        if (!this.props.visible) {
            return null;
        }

        const deltaRadius = this.props.size / 5;
        const deltaValue = this.props.range / 5;

        const markers = Array
        .from({length: 5}, (value, key) => key + 1)
        .map((index: number) => {
            return {
                radius: index * deltaRadius,
                distance: index * deltaValue
            }
        }).map((marker: any) => RangesOverlay.renderMarker(
            marker.radius,
            marker.distance,
            marker.distance === this.props.range
        ));

        return (
            <g transform={this.translation}>
                {markers}
            </g>
        );
    }

    private static renderMarker(radius: number, distance: number, isLast: boolean = false) {
        const formattedDistance = distance < 1000 ? distance : distance / 1000 + 'k';
        return (
            <g key={'marker-' + distance}>
                {!isLast &&
                <circle cx="0" cy="0" r={radius} stroke="#616161" fill="none" strokeDasharray="2 4"/>
                }
                <text
                    x={radius - 4} y="-8"
                    fontSize=".75rem" fill="#76797c" textAnchor="end"
                >{formattedDistance}</text>
            </g>
        );
    }
}
