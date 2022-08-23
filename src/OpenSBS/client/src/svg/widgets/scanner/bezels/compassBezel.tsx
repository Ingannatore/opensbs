import * as React from 'react';
import SvgTransforms from 'lib/svgTransforms';
import ColorPalette from 'svg/colorPalette';

interface CompassBezelProps {
    x: number,
    y: number,
    r: number,
    rotation: number,
}

export default class CompassBezel extends React.Component<CompassBezelProps, {}> {
    private readonly translation: string;
    private readonly markersDegrees: number[];

    public static defaultProps = {
        x: 0,
        y: 0,
        r: 460,
    };

    constructor(props: CompassBezelProps) {
        super(props);

        this.translation = SvgTransforms.translate(this.props.x, this.props.y);
        this.markersDegrees = Array.from({length: 24}, (value, key) => key * 15);
    }

    public render() {
        const markers = this.markersDegrees.map(
            (degrees: number) => CompassBezel.renderMarker(this.props.r, degrees)
        );

        return (
            <g transform={this.translation}>
                <g transform={SvgTransforms.rotate(-this.props.rotation)}>
                    {markers}
                </g>
            </g>
        );
    }

    private static renderMarker(radius: number, degrees: number) {
        if (degrees % 45 === 0) {
            return (
                <g key={'compass-marker-' + degrees} transform={SvgTransforms.rotate(degrees)}>
                    <text
                        x="0" y={-radius - 15}
                        textAnchor="middle"
                        fontSize="1.5rem"
                        fill={ColorPalette.FILLER}
                    >{degrees}</text>
                </g>
            );
        }

        return (
            <g key={'compass-marker-' + degrees} transform={SvgTransforms.rotate(degrees)}>
                <line
                    x1="0" y1={-radius - 8}
                    x2="0" y2={-radius - 22}
                    stroke={ColorPalette.TEXT} strokeWidth="2"
                />
            </g>
        );
    }
}
